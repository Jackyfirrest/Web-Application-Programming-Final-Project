const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// 讀取 JSON 檔案
const jsonData = fs.readFileSync('character-template.json');
const characters = JSON.parse(jsonData);

// 創建 SQLite 資料庫
const db = new sqlite3.Database('characters.db');

// 更新資料表結構，新增 image_prompt 欄位（如果不存在）
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      profession TEXT,
      specialization TEXT,
      interests TEXT,
      general_personality TEXT,
      specific_personality TEXT,
      passionate_personality TEXT,
      special_mode_enabled BOOLEAN,
      special_mode_quotes TEXT,
      relationship_mode_sweet_talk TEXT,
      relationship_mode_care TEXT,
      image_prompt TEXT
    )
  `);

  // 插入角色資料
  for (let key in characters) {
    const character = characters[key];
    const { name, background, personality, special_mode, relationship_mode, image_prompt } = character;

    const interests = background.interests.join(', ');
    const specialModeQuotes = special_mode.quotes.join(', ');
    const sweetTalk = relationship_mode.sweet_talk.join(', ');

    const query = `
      INSERT INTO characters (
        name,
        profession,
        specialization,
        interests,
        general_personality,
        specific_personality,
        passionate_personality,
        special_mode_enabled,
        special_mode_quotes,
        relationship_mode_sweet_talk,
        relationship_mode_care,
        image_prompt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      background.profession,
      background.specialization,
      interests,
      personality.general,
      personality.specific,
      personality.passionate,
      special_mode.enabled,
      specialModeQuotes,
      sweetTalk,
      relationship_mode.care,
      image_prompt
    ];

    db.run(query, values, function(err) {
      if (err) {
        console.error('Error inserting character:', err);
      } else {
        console.log(`Character "${name}" inserted successfully!`);
      }
    });
  }
});

// 關閉資料庫連線
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('Database closed successfully!');
  }
});
