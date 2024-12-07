const express = require('express');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
require('dotenv').config();
const path = require('path'); 

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('GOOGLE_APPLICATION_CREDENTIALS is not defined in .env file.');
    process.exit(1); // Debug 專用 看有沒有連好
}

console.log('Using credentials file at:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

// process.env.GOOGLE_APPLICATION_CREDENTIALS = './tts_api_key.json'; 
// 解析文件路径
const credentialsPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// 检查json key文件是否存在
if (!fs.existsSync(credentialsPath)) {
    console.error(`The credentials file does not exist at: ${credentialsPath}`);
    process.exit(1);
}

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
console.log('Using credentials file at:', credentialsPath);

const router = express.Router();
const client = new textToSpeech.TextToSpeechClient();

router.post('/synthesize', async (req, res) => {
    const { text, role } = req.body;

    // 驗證輸入參數
    if (!text || !role) {
        return res.status(400).json({ error: "Missing text or role in request body" });
    }

    try {
        // 根據角色名稱設定不同的語音屬性
        let voiceSettings;

        switch (role) {
            case '某位藝術家':
                voiceSettings = {
                    languageCode: 'cmn-TW',
                    name: 'cmn-TW-Wavenet-A',
                    ssmlGender: 'FEMALE',
                    pitch: 5.0,
                    speakingRate: 1.2
                };
                break;
            case '某位數學家':
                voiceSettings = {
                    languageCode: 'cmn-TW',
                    name: 'cmn-TW-Wavenet-B',
                    ssmlGender: 'MALE',
                    pitch: -2.0,
                    speakingRate: 1.0
                };
                break;
            case '某位編輯':
                voiceSettings = {
                    languageCode: 'cmn-TW',
                    name: 'cmn-TW-Wavenet-A',
                    ssmlGender: 'FEMALE',
                    pitch: -5.0,
                    speakingRate: 1.2
                };
                break;
            case '某位攝影師':
                voiceSettings = {
                    languageCode: 'cmn-TW',
                    name: 'cmn-TW-Wavenet-C',
                    ssmlGender: 'MALE',
                    pitch: 3.0,
                    speakingRate: 1.3
                };
                break;
            case '某位醫生':
                voiceSettings = {
                    languageCode: 'cmn-TW',
                    name: 'cmn-TW-Standard-B',
                    ssmlGender: 'MALE',
                    pitch: -1.0,
                    speakingRate: 1.0
                };
                break;
            default:
                return res.status(400).json({ error: "Unknown role" });
        }

        // 設定 TTS 請求
        const request = {
            input: { text },
            voice: {
                languageCode: voiceSettings.languageCode,
                name: voiceSettings.name,
                ssmlGender: voiceSettings.ssmlGender
            },
            audioConfig: {
                audioEncoding: 'MP3',
                pitch: voiceSettings.pitch,
                speakingRate: voiceSettings.speakingRate
            }
        };

        // 呼叫 Google TTS API
        const [response] = await client.synthesizeSpeech(request);

        // 返回音頻內容 (base64 格式)
        res.json({ audioContent: response.audioContent.toString('base64') });
    } catch (error) {
        console.error('Error during TTS synthesis:', error);
        res.status(500).json({ error: "Error synthesizing speech" });
    }
});

module.exports = router;
