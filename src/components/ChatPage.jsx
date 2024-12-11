import React, { useState, useEffect, useRef } from "react";
import ChatBox from "./ChatBox";
import InputContainer from "./InputContainer";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChatPage = ({ selectedCharacter, characters, characterImageUrl }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [characterImagePrompt, setCharacterImagePrompt] = useState("");
    const [selectedName, setSelectedName] = useState("某位編輯");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const navigate = useNavigate();

    // 用於儲存當前播放中的 Audio 實例(避免前一個聲音還沒結束結果下一個使用者回覆就來了)
    const currentAudioRef = useRef(null);

    useEffect(() => {
        const character = localStorage.getItem("CHARACTER");
        if (character === null) {
            alert("沒有選定的角色，將自動跳轉至選擇頁面...");
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (selectedCharacter && characters) {
            const character = characters[selectedCharacter];
            const imagePrompt = character ? character.image_prompt : "No image prompt available";
            setCharacterImagePrompt(imagePrompt);
            setSelectedName(selectedCharacter);
        }
    }, [selectedCharacter, characters]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const playAudio = (audioContent) => {
        // 如果有音檔正在播放，先停止並清除(避免打架)
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }

        const audio = new Audio(audioContent);
        currentAudioRef.current = audio;
        audio.play();
    };

    const sendMessage = async () => {
        if (input.trim() === "") return;

        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");
        setIsBotTyping(true);

        try {
            const chatResponse = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, characterName: selectedName }),
            });
            const chatData = await chatResponse.json();
            const responseText = chatData.reply;
            setIsBotTyping(false);
            setMessages((prev) => [...prev, { text: responseText, sender: "bot" }]);

            // 呼叫 TTS API 將 responseText 轉為語音
            try {
                const ttsResponse = await fetch("http://localhost:3000/api/tts/synthesize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: responseText, role: selectedName }),
                });
                const ttsData = await ttsResponse.json();
                if (ttsData.audioContent) {
                    const audioContent = `data:audio/mp3;base64,${ttsData.audioContent}`;
                    playAudio(audioContent);
                }
            } catch (ttsError) {
                console.error("Error in TTS synthesis:", ttsError);
            }

        } catch (error) {
            console.error("Error in chat:", error);
            setIsBotTyping(false);
            setMessages((prev) => [
                ...prev,
                { text: "抱歉，無法處理您的訊息，請稍後再試。", sender: "bot" },
            ]);
        }
    };

    const getTarot = async () => {
        setIsBotTyping(true);
        try {
            const response = await fetch("http://localhost:3000/api/tarot");
            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                { text: `你抽到的塔羅牌是：${data.card}`, sender: "bot" },
                { text: `愛情方面的解釋：${data.explanation1}`, sender: "bot" },
                { text: `事業方面的解釋：${data.explanation2}`, sender: "bot" },
                { text: `今日運勢：${data.explanation3}`, sender: "bot" },
            ]);
        } catch (error) {
            console.error("Error fetching tarot card:", error);
            setMessages((prev) => [
                ...prev,
                { text: "抱歉，無法抽取塔羅牌，請稍後再試。", sender: "bot" },
            ]);
        } finally {
            setIsBotTyping(false);
        }
    };

    const generateImage = async () => {
        if (input.trim() === "") return;
    
        // 加入機器人回應，顯示正在處理的提示
        setMessages((prev) => [
            ...prev,
            { text: input, sender: "user" },
        ]);
    
        setInput(""); // 清空輸入框
        setIsBotTyping(true); // 設置機器人正在輸入狀態
    
        try {
            // 向後端發送請求，傳遞輸入的描述
            const response = await fetch("http://localhost:3000/api/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: { prompt: input } }),
            });
    
            const data = await response.json();

            console.log(data.refinedPrompt);
    
            if (data.refinedPrompt) {
                // 添加圖片和描述到聊天框
                setMessages((prev) => [
                    ...prev,
                    // { text: "這是根據你的描述生成的圖片：", sender: "bot" },
                    { text: `${data.imaginaryResponse}`, sender: "bot" },
                    { text: data.refinedPrompt, sender: "image" }, // 顯示圖片
                ]);
            } else {
                throw new Error("無法取得圖片，請稍後再試。");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            setMessages((prev) => [
                ...prev,
                { text: "抱歉，圖片生成失敗，請稍後再試。", sender: "bot" },
            ]);
        } finally {
            setIsBotTyping(false); // 恢復機器人狀態
        }
    };
    

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                background: "linear-gradient(to bottom, #FFC1CC, #FF9999)",
            }}
        >
            {/* 頁面標題 */}
            <Box
                sx={{
                    padding: 2,
                    flexShrink: 0,
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    position: "relative",
                }}
            >
                <Button
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#FF6F61",
                        color: "#FFFFFF",
                        fontSize: "1.2rem",
                        "&:hover": {
                            backgroundColor: "#FF8A80",
                        },
                    }}
                    onClick={() => navigate("/")}
                >
                    ←
                </Button>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "'Noto Sans TC', sans-serif",
                        fontWeight: "bold",
                        color: "#D32F2F",
                    }}
                >
                    戀愛機器人
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{
                        fontFamily: "'Noto Sans TC', sans-serif",
                        color: "#D81B60",
                    }}
                >
                    跟 {selectedName} 交談吧!
                </Typography>
            </Box>

            {/* 聊天框 */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: "10px 20px",
                    borderRadius: 2,
                }}
            >
                <ChatBox
                    messages={messages}
                    characterImagePrompt={characterImagePrompt}
                    characterImageUrl={characterImageUrl}
                    isBotTyping={isBotTyping}
                />
            </Box>

            {/* 輸入區域 */}
            <Box
                sx={{
                    flexShrink: 0,
                    padding: 2,
                    borderTop: "1px solid #ddd",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
            >
                <InputContainer
                    input={input}
                    setInput={setInput}
                    handleKeyDown={handleKeyDown}
                    sendMessage={sendMessage}
                    getTarot={getTarot}
                    generateImage={generateImage}
                />
            </Box>
        </Box>
    );
};

export default ChatPage;
