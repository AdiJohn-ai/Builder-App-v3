import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// POST: /api/chat
router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
            body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: messages,
          max_tokens: 1000, 
        }),

    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenRouter Error:", data.error);
      return res.status(500).json({ error: data.error.message || "Something went wrong" });
    }

    const assistantMessage = data.choices[0].message.content;
    res.json({ content: assistantMessage });
  } catch (error) {
    console.error("OpenRouter Error:", error.message || error);
    res.status(500).json({ error: "Something went wrong with the chatbot." });
  }
});

export default router;
