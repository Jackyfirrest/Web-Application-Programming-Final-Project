import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import InputContainer from "./InputContainer";
import axios from 'axios';

const ChatPage = ({ selectedCharacter, characters, characterImageUrl }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [characterImagePrompt, setCharacterImagePrompt] = useState("");
    const [selectedName, setSelectedName] = useState("某位編輯");

    useEffect(() => {
        if (selectedCharacter && characters) {
            const character = characters[selectedCharacter];
            const imagePrompt = character ? character.image_prompt : 'No image prompt available';
            const name = character ? character.name : '某位編輯';
            setCharacterImagePrompt(imagePrompt);
            setSelectedName(name);
        }
    }, [selectedCharacter, characters]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const sendMessage = async () => {
        if (input.trim() === "") return;

        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");

        try {
            // 抓取ai的回覆
            const chatResponse = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, characterName: selectedName }),
            });
            const chatData = await chatResponse.json();
            const responseText = chatData.reply;

            // 更新訊息
            setMessages((prev) => [...prev, { text: responseText, sender: "bot" }]);

            // 抓取tts的audio
            const ttsResponse = await fetch("http://localhost:3000/api/tts/synthesize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: responseText, role: selectedName }),
            });

            const ttsData = await ttsResponse.json();
            if (ttsData.audioContent) {
                const audio = new Audio(`data:audio/mp3;base64,${ttsData.audioContent}`);
                audio.play(); // 撥出語音檔
            }
        } catch (error) {
            console.error("Error in chat or TTS:", error);
            setMessages((prev) => [
                ...prev,
                { text: "抱歉，無法處理您的訊息，請稍後再試。", sender: "bot" },
            ]);
        }
    };

    const getTarot = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tarot");
            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                { text: `你抽到的塔羅牌是：${data.card}`, sender: "bot" },
                { text: `塔羅牌解釋：${data.explanation}`, sender: "bot" },
            ]);
        } catch (error) {
            console.error("Error fetching tarot card:", error);
            setMessages((prev) => [
                ...prev,
                { text: "抱歉，無法抽取塔羅牌，請稍後再試。", sender: "bot" },
            ]);
        }
    };

    const generateImage = () => {
        if (input.trim() === "") return;

        setMessages((prev) => [
            ...prev,
            { text: "這是根據你的描述生成的圖片：", sender: "bot" },
            { text: input, sender: "image" },
        ]);
    };

    return (
        <div className="container">
            <h2>戀愛機器人</h2>
            <h3>跟 {selectedName} 交談吧 !</h3>

            <ChatBox
                messages={messages}
                characterImagePrompt={characterImagePrompt}
                characterImageUrl={characterImageUrl}
            />

            <InputContainer
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                sendMessage={sendMessage}
                getTarot={getTarot}
                generateImage={generateImage}
            />
        </div>
    );
};

export default ChatPage;
