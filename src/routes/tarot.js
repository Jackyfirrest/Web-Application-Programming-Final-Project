require("dotenv").config();

const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const tarotCards = [
    // 大阿爾克那
    { card: '愚者' },
    { card: '魔術師' },
    { card: '女祭司' },
    { card: '皇后' },
    { card: '皇帝' },
    { card: '教皇' },
    { card: '戀人' },
    { card: '戰車' },
    { card: '力量' },
    { card: '隱士' },
    { card: '命運之輪' },
    { card: '正義' },
    { card: '倒吊人' },
    { card: '死亡' },
    { card: '節制' },
    { card: '惡魔' },
    { card: '塔' },
    { card: '星星' },
    { card: '月亮' },
    { card: '太陽' },
    { card: '審判' },
    { card: '世界' },

    // 小阿爾克那
    { card: '權杖一' },
    { card: '權杖二' },
    { card: '權杖三' },
    { card: '權杖四' },
    { card: '權杖五' },
    { card: '權杖六' },
    { card: '權杖七' },
    { card: '權杖八' },
    { card: '權杖九' },
    { card: '權杖十' },

    { card: '聖杯一' },
    { card: '聖杯二' },
    { card: '聖杯三' },
    { card: '聖杯四' },
    { card: '聖杯五' },
    { card: '聖杯六' },
    { card: '聖杯七' },
    { card: '聖杯八' },
    { card: '聖杯九' },
    { card: '聖杯十' },

    { card: '寶劍一' },
    { card: '寶劍二' },
    { card: '寶劍三' },
    { card: '寶劍四' },
    { card: '寶劍五' },
    { card: '寶劍六' },
    { card: '寶劍七' },
    { card: '寶劍八' },
    { card: '寶劍九' },
    { card: '寶劍十' },

    { card: '錢幣一' },
    { card: '錢幣二' },
    { card: '錢幣三' },
    { card: '錢幣四' },
    { card: '錢幣五' },
    { card: '錢幣六' },
    { card: '錢幣七' },
    { card: '錢幣八' },
    { card: '錢幣九' },
    { card: '錢幣十' }
];

router.get('/', async (req, res) => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const selectedCard = tarotCards[randomIndex];

    // 檢查是否有選中卡片
    //console.log("選中的塔羅牌:", selectedCard);

    // 呼叫 Gemini API 生成解釋
    const prompt = `我是你的情侶，請幫我用繁體中文解釋這張塔羅牌，必須包含愛情、事業、今日運勢，最後要有總結與建議: ${selectedCard.card}`;
    try {
        const result = await model.generateContent(prompt);
        const explanation = result.response.text();
        
        // 確認解釋是否正確
        //console.log("塔羅牌解釋:", explanation);

        // 回傳卡片和解釋
        res.json({
            card: selectedCard.card,
            explanation: explanation
        });
    } catch (error) {
        console.error('Error generating explanation:', error);
        res.json({
            card: selectedCard.card,
            explanation: '無法生成塔羅牌解釋，請稍後再試。'
        });
    }
});

module.exports = router;
