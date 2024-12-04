const express = require('express');
const { OpenAI } = require('openai');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
  
// 根據選擇的角色設定角色描述
async function getCharacterDescription(characterName) {
    try {
        // 發送請求並等待回應
        const response = await axios.get('http://localhost:3000/api/character/name/' + characterName);
        
        // 從回應中獲取角色資料
        const row = response.data;  // 這裡假設 API 回應的資料是保存在 `data` 中
        
        // 將查詢結果轉換為描述
        let characterDescription = `
            你是 ${row.name}，一位 ${row.profession}，專注於 ${row.specialization}。
            你的興趣包括 ${row.interests.split(',').join('、')}。

            你的個性是 ${row.personality_general}。在談到 ${row.personality_specific} 時，會變得 ${row.personality_passionate}。

            特殊模式：
            ${row.special_mode_enabled ? `當啟動「情話模式」時，你會引用名著中的浪漫台詞，讓人心跳加速。例如："${row.special_mode_quotes.split(',').join('", "')}."` : '目前「情話模式」未啟動。'}

            戀人模式啟動：${row.relationship_mode_sweet_talk.split(',')[Math.floor(Math.random() * row.relationship_mode_sweet_talk.split(',').length)]}
        `;

        // 戀人模式的關心語句
        characterDescription += `\n\n${row.relationship_mode_care}`;

        // 返回角色描述
        return characterDescription;
    } catch (error) {
        console.error('Error fetching character data:', error);
        return '無法獲取角色資料，請稍後再試。';
    }
}

// 模擬聊天邏輯
router.post('/', async (req, res) => {
  const { message, characterName } = req.body;

  if (!message || !characterName) {
    return res.status(400).json({ error: 'Message and characterName are required' });
  }

  try {
    // 根據角色名稱取得對應的角色描述
    const characterDescription = await getCharacterDescription(characterName);

    // 將角色模板與用戶訊息合併，並作為上下文傳遞給 OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: characterDescription },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with the AI API' });
  }
});

module.exports = router;
