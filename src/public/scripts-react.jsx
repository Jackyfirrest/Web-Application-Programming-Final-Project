import { createRoot } from "react-dom/client";
import { usePollinationsImage } from "@pollinations/react";
import portrait from './avatars/portrait.png';  // 引入圖片
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import AvatarGenerator from "../components/AvatarGenerator"; // 引入 AvatarGenerator


const App = () => {
    const [messages, setMessages] = useState([]); // Chat messages
    const [input, setInput] = useState(""); // User input
    const [selectedCharacter, setSelectedCharacter] = useState(0); // Selected character (bot, editor, photographer, etc.)
    const [characters, setCharacters] = useState({}); // Character data from JSON
    const [avatar, setAvatar] = useState(portrait); // Avatar image
    const [characterImagePrompt, setCharacterImagePrompt] = useState(""); // Image prompt for character
    const [selectedName, setSelectedName] = useState("某位編輯"); // Selected character name
    const [generate, setGenerate] = useState(false); // 控制是否顯示 Avatar

    const handleGenerateAvatar = () => {
        setGenerate(true); // 點擊按鈕時觸發生成
    };



    useEffect(() => {
        // 請求 API 獲取名字
        axios.get('http://localhost:3000/api/character')
          .then(response => {
            setCharacters(response.data); // 設置名字列表
          })
          .catch(error => {
            console.error('Error fetching names:', error);
          });
    }, []); // 空依賴數組，表示只在組件掛載時請求一次

    useEffect(() => {
        console.log(characters[selectedCharacter]);
        console.log(selectedCharacter);

        if(selectedCharacter && characters) {
            const character = characters[selectedCharacter];
            // 提取該角色的 image_prompt
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


    // Function to handle sending messages
    const sendMessage = async () => {
        if (input.trim() === "") return;

        // Add user message to the chat
        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput(""); // Clear input field

        try {
            // Based on the selected character, send the message differently
            let responseText = "";
            const response = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, characterName: selectedName }),
            });
            const data = await response.json();
            responseText = data.reply;
            
            // Add response based on the selected character
            setMessages((prev) => [...prev, { text: responseText, sender: "bot" }]);
        } catch (error) {
            console.error("Error fetching chat reply:", error);
            setMessages((prev) => [
                ...prev,
                { text: "抱歉，無法處理您的訊息，請稍後再試。", sender: "bot" },
            ]);
        }
    };

    // Function to get a tarot card
    const getTarot = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tarot");
            const data = await response.json();

            // Add tarot card and explanation to the chat
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

    // Function to generate an image
    const generateImage = () => {
        if (input.trim() === "") return;

        setMessages((prev) => [
            ...prev,
            { text: "這是根據你的描述生成的圖片：", sender: "bot" },
            { text: input, sender: "image" }, // Temporarily store the description
        ]);
    };

    const ImageComponent = ({ description }) => {
        setInput(""); // Clear input field
        // Generate image based on user input
        const imageUrl = usePollinationsImage(description, {
            width: 1024,
            height: 1024,
            seed: 4,
            model: "flux",
            nologo: true,
        });

        return (
            <div>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Generated image"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    };

    
        return (
        <div className="container">
            <h2>戀愛機器人</h2>

            {/* Role Selection Dropdown */}
            <div>
                <label htmlFor="character-select">選擇角色:</label>
                <select
                    id="character-select"
                    value={selectedCharacter}
                    onChange={(e) => setSelectedCharacter(e.target.value)}
                >
                    {Object.keys(characters).map((key) => (
                        <option key={key} value={key}>
                            {characters[key].name}
                        </option>
                    ))}
                </select>
            </div>

            <div id="chat-box">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={
                            msg.sender === "user"
                                ? "user-message"
                                : msg.sender === "bot"
                                ? "bot-message"
                                : "image-message"
                        }
                    >
                        <div className="message-content">
                            {msg.sender === "bot" && (
                                <>
                                {characterImagePrompt && <AvatarGenerator prompt={characterImagePrompt} />}
                                </>
                            )}
                            <div className="message-text">
                                {msg.sender === "image" ? (
                                    <ImageComponent description={msg.text} />
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="說些什麼吧..."
                />
                <button onClick={sendMessage}>發送</button>
            </div>

            <div className="extra-buttons">
                <button onClick={getTarot}>抽塔羅牌</button>
                <button onClick={generateImage}>生成圖片</button>
            </div>
        </div>
    );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
