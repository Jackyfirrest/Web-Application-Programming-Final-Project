const express = require('express');
const router = express.Router();

// 假設你有一個塔羅牌卡片的數組
const tarotCards = [
    { card: '愚者' },
    { card: '魔術師' },
    { card: '女祭司' },
    { card: '皇后' },
    { card: '皇帝' },
    { card: '教皇' },
    // 更多卡片
];

router.get('/', (req, res) => {
    // 隨機選擇一張牌
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const selectedCard = tarotCards[randomIndex];

    // 返回隨機選擇的卡片
    res.json(selectedCard);
});

module.exports = router;
