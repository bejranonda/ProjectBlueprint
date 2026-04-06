export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { blueprint, systemPrompt } = body;

    const accountId = env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = env.CF_API_TOKEN;

    if (!accountId || !apiToken) {
      return new Response(JSON.stringify({ error: "Missing Cloudflare credentials" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3-8b-instruct`;

    const payload = {
      messages: [
        { role: "system", content: `You are an expert AI assistant. Please strictly follow the constraints and context provided in this project blueprint:\n\n${blueprint}` },
        { role: "user", content: systemPrompt }
      ],
      stream: true
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Cloudflare API responded with ${response.status}`);
    }

    // Transform Cloudflare's SSE stream into a raw text stream for the client
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    const encoder = new TextEncoder();

    (async () => {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n\n');
          buffer = parts.pop() || "";
          
          for (const part of parts) {
            if (part.trim() === 'data: [DONE]') return;
            if (part.startsWith('data: ')) {
              try {
                const data = JSON.parse(part.slice(6));
                if (data.response) {
                  await writer.write(encoder.encode(data.response));
                }
              } catch (e) {
                // Ignore parse errors on incomplete chunks
              }
            }
          }
        }
      } catch (err) {
        console.error("Stream processing error:", err);
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
