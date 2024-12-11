const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { OpenAI } = require('openai');
require('dotenv').config();

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 精緻化 prompt 的函數
async function refinePromptWithGPT4o(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "你是一位專業的提示詞優化專家，將用戶輸入的描述轉換為具體且視覺化的環境描述，適合用於 AI 圖片生成。" },
        { role: "user", content: `請將以下描述精緻化成五個英文單字內適合 AI 生成圖片的英文提示詞：${prompt}` },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("GPT-4o 精緻化 prompt 出錯:", error);
    return prompt; // 如果 GPT-4o 出錯，返回原始 prompt
  }
}

// 1. GPT-4o 生成「合適的回應描述」
async function generateImaginaryResponse(prompt) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "你是一位富有創造力的敘述者，根據使用者的輸入描述想像一個具體、生動且帶有生活感你自己的場景，並用一句話以內描述。",
          },
          {
            role: "user",
            content: `請根據以下描述生成一段生動具體的回應：${prompt}`,
          },
        ],
        temperature: 0.8,
        max_tokens: 150,
      });
  
      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error("GPT-4o 想像回應出錯:", error);
      return "一個溫暖且富有生活感的場景。"; // 錯誤時返回預設內容
    }
  }
// 模擬 AI 圖片生成
router.post('/', async (req, res) => {
  // 從 req.body.description 提取 prompt
  const { prompt } = req.body.description;

  console.log("收到的描述:", prompt);

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

    // 生成虛構的回應描述
    const imaginaryResponse = await generateImaginaryResponse(prompt);
    console.log("GPT-4o 想像回應:", imaginaryResponse);

  // 使用 GPT-4o 精緻化 prompt
  const refinedPrompt = await refinePromptWithGPT4o(imaginaryResponse);
  console.log("GPT-4o 精緻化後的 prompt:", refinedPrompt);

  if (imaginaryResponse && refinedPrompt) {
    res.json({ imaginaryResponse, refinedPrompt }); // 同時返回精緻化的 prompt
  } else {
    res.status(500).json({ error: 'Image generation failed' });
  }
});

module.exports = router;
