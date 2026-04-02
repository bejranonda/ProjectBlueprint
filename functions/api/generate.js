export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { blueprint, systemPrompt } = body;

    // Need Account ID and Token
    const accountId = env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = env.CF_API_TOKEN;

    if (!accountId || !apiToken) {
      return new Response(JSON.stringify({ error: "Missing Cloudflare credentials" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3-8b-instruct`;

    // 1. Generate Without Blueprint
    const resWithout = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: systemPrompt }
        ]
      })
    });
    const withoutData = await resWithout.json();
    const textWithout = withoutData.success ? withoutData.result.response : "Error generation without blueprint.";

    // 2. Generate With Blueprint
    const resWith = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: `You are an expert AI assistant. Please strictly follow the constraints and context provided in this project blueprint:\n\n${blueprint}` },
          { role: "user", content: systemPrompt }
        ]
      })
    });
    const withData = await resWith.json();
    const textWith = withData.success ? withData.result.response : "Error generation with blueprint.";

    return new Response(JSON.stringify({
      withoutBlueprint: textWithout,
      withBlueprint: textWith
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
