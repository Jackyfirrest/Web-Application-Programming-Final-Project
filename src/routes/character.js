const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// 設定資料庫的路徑
const dbPath = path.resolve(__dirname, '../db/characters.db'); // 確保路徑正確

// 開啟資料庫連線
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to open database:', err);
        process.exit(1);  // 如果連線失敗，退出程式
    } else {
        console.log('Database connected successfully');
    }
});

// Route to get all characters
router.get('/', (req, res) => {
    db.all('SELECT * FROM characters', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); // Return all character rows
    });
});

// Route to get character by name
router.get('/name/:name', (req, res) => {
    const { name } = req.params; // Extract name from the URL
    db.get('SELECT * FROM characters WHERE name = ?', [name], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json(row); // Return the character matching the name
    });
});

module.exports = router;
