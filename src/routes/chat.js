const express = require('express');
const router = express.Router();

// 模擬聊天邏輯
router.post('/', (req, res) => { // 使用 POST 方法來接收訊息
    const { message } = req.body; // 取得用戶發送的訊息

    if (!message) {
        return res.status(400).json({ error: 'Message is required' }); // 如果沒有訊息，回傳錯誤
    }

    // 這裡可以接入 AI 聊天模型 (例如 OpenAI API)
    const reply = `You said: ${message}. This is a response from the chatbot.`; // 模擬回應

    res.json({ reply }); // 回傳機器人回應
});

module.exports = router;
