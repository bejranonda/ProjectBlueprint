const MODEL = "@cf/meta/llama-3-8b-instruct";

function jsonError(message, status, extra = {}) {
  return new Response(JSON.stringify({ error: message, ...extra }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Transform Cloudflare's SSE stream (`data: {"response":"..."}\n\n`) into a
 * raw text stream for the client. Works for both the Workers AI binding and
 * the REST API, which emit the same event format.
 */
function sseToText(sourceStream) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const reader = sourceStream.getReader();
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();

  (async () => {
    let buffer = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          if (part.trim() === "data: [DONE]") return;
          if (part.startsWith("data: ")) {
            try {
              const data = JSON.parse(part.slice(6));
              if (data.response) {
                await writer.write(encoder.encode(data.response));
              }
            } catch {
              // Ignore parse errors on incomplete chunks.
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

  return readable;
}

const streamHeaders = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-cache",
};

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => ({}));
    const { blueprint, systemPrompt } = body;

    if (!blueprint || !systemPrompt) {
      return jsonError("Request must include 'blueprint' and 'systemPrompt'.", 400);
    }

    const messages = [
      {
        role: "system",
        content: `You are an expert AI assistant. Please strictly follow the constraints and context provided in this project blueprint:\n\n${blueprint}`,
      },
      { role: "user", content: systemPrompt },
    ];

    // Preferred path: native Workers AI binding (platform-authenticated, no token).
    if (env.AI && typeof env.AI.run === "function") {
      const aiStream = await env.AI.run(MODEL, { messages, stream: true });
      return new Response(sseToText(aiStream), { headers: streamHeaders });
    }

    // Fallback path: Cloudflare REST API with an account id + API token.
    const accountId = env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = env.CF_API_TOKEN;

    if (!accountId || !apiToken) {
      // 503: the server is reachable but the AI integration isn't configured.
      return jsonError(
        "AI is not configured on the server. Bind a Workers AI binding named 'AI', " +
          "or set the CLOUDFLARE_ACCOUNT_ID and CF_API_TOKEN environment variables in the " +
          "Cloudflare Pages project settings, then redeploy.",
        503
      );
    }

    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, stream: true }),
    });

    if (!response.ok) {
      const detail = (await response.text().catch(() => "")).slice(0, 300);
      return jsonError(`Cloudflare AI API responded with ${response.status}.`, 502, { detail });
    }

    return new Response(sseToText(response.body), { headers: streamHeaders });
  } catch (error) {
    return jsonError(error?.message || "Unexpected server error.", 500);
  }
}
