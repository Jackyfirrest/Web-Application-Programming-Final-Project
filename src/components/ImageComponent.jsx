import React, { useState, useEffect } from "react";
import { usePollinationsImage } from "@pollinations/react";
import { Box, Typography } from "@mui/material";
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // 從環境變數讀取 API 金鑰
  dangerouslyAllowBrowser: true, // 允許在前端使用 OpenAI API
});

// 翻譯函式
export async function translateToEnglish(description) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // 使用 GPT-4 模型
      messages: [
        { role: 'system', content: 'You are a helpful assistant that translates text to English. If the word I give you is already English, then just return that word.' },
        { role: 'user', content: description },
      ],
    });

    // 返回翻譯結果
    return completion.choices[0]?.message?.content || 'No response';
  } catch (error) {
    console.error('Error:', error);
    return 'Error translating text';
  }
}



const ImageComponent = ({ description, setLoading }) => {
    const [loaded, setLoaded] = useState(false);
    const [dots, setDots] = useState("");
    const [translatedDescription, setTranslatedDescription] = useState("");
    // 翻譯 description 並更新狀態
    useEffect(() => {
        async function fetchTranslation() {
            // setLoading(true);
            const englishText = await translateToEnglish(description);
            setTranslatedDescription(`You are my spouse, please generate an image of ${englishText}`);
            // setLoading(false);
        }
        fetchTranslation();
    }, [description, setLoaded]);
    
    const imageUrl = usePollinationsImage(translatedDescription, {
        width: 150,
        height: 150,
        seed: 4,
        model: "flux",
        nologo: true,
    });

    

    const handleImageLoad = () => {
        setLoaded(true);
        setLoaded(false);
    };

    // 點點動畫
    useEffect(() => {
        if (!loaded) {
            const interval = setInterval(() => {
                setDots((prev) => (prev.length < 3 ? prev + "." : ""));
            }, 500); // 每500毫秒切換一次
            return () => clearInterval(interval);
        }
    }, [loaded]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: loaded ? "200px" : "40px", // 加載時高度為細橫框，完成後展開
                transition: "height 0.3s ease", // 平滑展開動畫
                background: loaded
                    ? "#f0f0f0"
                    : "linear-gradient(90deg, #e3f2fd, #e8f5e9)", // 漸變背景
                borderRadius: 2,
                position: "relative",
                overflow: "hidden", // 防止內容溢出
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            {!loaded && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "linear-gradient(to right, #42a5f5, #66bb6a)",
                            fontStyle: "italic",
                            fontSize: "14px",
                            fontWeight: "bold",
                            animation: "fade 1.5s infinite",
                            "@keyframes fade": {
                                "0%": { opacity: 0.5 },
                                "50%": { opacity: 1 },
                                "100%": { opacity: 0.5 },
                            },
                        }}
                    >
                        Generating{dots}
                    </Typography>
                </Box>
            )}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Generated image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: loaded ? "block" : "none",
                        borderRadius: "8px",
                    }}
                    onLoad={handleImageLoad}
                />
            )}
        </Box>
    );
};

export default ImageComponent;



