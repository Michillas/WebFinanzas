
export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const apiKey = process.env.OPENAI_API_KEY;
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "webfinanzas.vercel.app",
          "X-Title": "WebFinanzas",
        },
        body: JSON.stringify(req.body),
      });
  
      if (!response.ok) {
        const text = await response.text();
        return res.status(response.status).send(text);
      }
  
      const data = await response.json();
      res.status(200).json(data);
  
    } catch (error) {
      res.status(500).json({ 
        error: "Unexpected server error", 
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }