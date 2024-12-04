require("dotenv").config();

const express = require('express');
const router = express.Router();

const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

process.env.GOOGLE_APPLICATION_CREDENTIALS = './tts_api_key.json'; // 確保這裡指向您的 JSON 文件路徑

const client = new textToSpeech.TextToSpeechClient();

router.post('/synthesize', async (req, res) => {
    const text = '你今天過的還好嗎寶貝';
    const { role } = req.body;
    console.log(req.body);c

    //驗證參數非空值
    if (!role) {
        return res.json({'error': "Missing role in request body"});
    }

    try {
        let voiceSettings;

        // 根據選擇的角色設定不同的語音屬性
        if (role === '可愛的女生') {
            voiceSettings = {
                languageCode: 'cmn-TW',
                name: 'cmn-TW-Wavenet-A',
                ssmlGender: 'FEMALE',
                pitch: 5.0,
                speakingRate: 1.2
            };
        } else if (role === '酷酷的男生') {
            voiceSettings = {
                languageCode: 'cmn-TW',
                name: 'cmn-TW-Wavenet-B',
                ssmlGender: 'MALE',
                pitch: -2.0,
                speakingRate: 1.0
            };
        } else if (role === '溫柔的大姐姐') {
            voiceSettings = {
                languageCode: 'cmn-TW',
                name: 'cmn-TW-Wavenet-A',
                ssmlGender: 'FEMALE',
                pitch: 2.0,
                speakingRate: 0.9
            };
        } else if (role === '年輕的陽光男孩') {
            voiceSettings = {
                languageCode: 'cmn-TW',
                name: 'cmn-TW-Wavenet-C',
                ssmlGender: 'MALE',
                pitch: 3.0,
                speakingRate: 1.3
            };
        } else if (role === '成熟的男性紳士') {
            voiceSettings = {
                languageCode: 'cmn-TW',
                name: 'cmn-TW-Standard-B',
                ssmlGender: 'MALE',
                pitch: -1.0,
                speakingRate: 1.0
            };
        } else {
            return res.status(400).send('Unknown role');
        }

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
                speakingRate: voiceSettings.speakingRate,
                effectsProfileId: ['small-bluetooth-speaker-class-device']
            }
        };

        const [response] = await client.synthesizeSpeech(request);
        const audioContent = response.audioContent;

        // 返回音頻內容給前端，並以 base64 格式
        res.json({ audioContent: audioContent.toString('base64') });
    } catch (error) {
        console.error('Error during TTS synthesis:', error);
        res.status(500).send('Error synthesizing speech');
    }
});

module.exports = router;
