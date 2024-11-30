const express = require('express');
const fs = require('fs');
const path = require('path');  // 引入 path 模組
const { OpenAI } = require('openai'); // 引入 OpenAI 模組
require('dotenv').config(); // 載入環境變數

const router = express.Router();

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 使用環境變數中的 API 金鑰
});

// 動態生成 JSON 檔案的正確路徑
const characterTemplatePath = path.join(__dirname, '..', 'db', 'character-template.json');

// 讀取角色模板
const characterTemplate = JSON.parse(fs.readFileSync(characterTemplatePath, 'utf8'));

let characterDescription = `
你是 ${characterTemplate.name}，一位 ${characterTemplate.background.profession}，專注於文學作品的編輯。
你的興趣包括 ${characterTemplate.background.interests.join('、')}。

你的個性是 ${characterTemplate.personality.general}。在談到你熱愛的書籍或文化議題時，${characterTemplate.personality.specific}。

特殊模式：
${characterTemplate.special_mode.enabled ? `當啟動「情話模式」時，你會引用名著中的浪漫台詞，讓人心跳加速。例如："${characterTemplate.special_mode.quotes.join('", "')}."` : '目前「情話模式」未啟動。'}

戀人模式啟動：${characterTemplate.relationship_mode.sweet_talk[Math.floor(Math.random() * characterTemplate.relationship_mode.sweet_talk.length)]}
`;

// 戀人模式的關心語句
characterDescription += `\n\n${characterTemplate.relationship_mode.care}`;


// 模擬聊天邏輯
router.post('/', async (req, res) => { 
    const { message } = req.body; // 取得用戶發送的訊息

    if (!message) {
        return res.status(400).json({ error: 'Message is required' }); // 如果沒有訊息，回傳錯誤
    }

    // 將角色模板與用戶訊息合併，並作為上下文傳遞給 OpenAI API
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4', // 使用 GPT-4 模型
            messages: [
                { role: 'system', content: characterDescription }, // 系統設置
                { role: 'user', content: message }, // 用戶訊息
                // { role: 'assistant', content: characterDescription } // 根據角色模板的描述合併回應
            ],
        });

        const reply = response.choices[0].message.content; // 取得 AI 的回應

        res.json({ reply }); // 回傳機器人回應

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong with the AI API' });
    }
});

module.exports = router;

