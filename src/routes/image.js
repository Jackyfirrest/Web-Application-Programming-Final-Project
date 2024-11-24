const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');  // 如果需要使用fetch, 可以安裝 node-fetch 模組

// 模擬 AI 圖片生成
router.post('/', async (req, res) => {
    // 從 req.body.description 提取 prompt
    const { prompt } = req.body.description;

    console.log(req.body.description);

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // 定義一個異步函數來處理圖片生成
    async function generateImage(prompt) {
        try {
            // 發送 HTTP 請求獲取圖片 URL
            const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
            
            if (response.ok) {
                const data = await response.json(); // 假設返回的是 JSON 格式
                return data.imageUrl;  // 假設返回的圖片 URL 存在於 imageUrl 欄位
            } else {
                throw new Error('Failed to generate image');
            }
        } catch (error) {
            console.error('Error generating image:', error);
            return null;  // 或者可以返回一個默認的錯誤圖片 URL
        }
    }

    // 呼叫異步函數生成圖片 URL
    const imageUrl = await generateImage(prompt);

    console.log(imageUrl);

    if (imageUrl) {
        res.json({ imageUrl });
    } else {
        res.status(500).json({ error: 'Image generation failed' });
    }
});

module.exports = router;
