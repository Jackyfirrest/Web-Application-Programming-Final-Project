require('dotenv').config();  // 載入 .env 檔案
const { OpenAI } = require('openai');  // 引入 openai 套件

// 使用環境變數讀取 OpenAI API 金鑰
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    // 測試呼叫 OpenAI API 的請求
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello, world!' }],
    });

    console.log('OpenAI Response:', response);
  } catch (error) {
    console.error('Error accessing OpenAI API:', error);
  }
}

testOpenAI();
