import { useState } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
    const [messages, setMessages] = useState([]); // Chat messages
    const [input, setInput] = useState(""); // User input

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    // Function to handle sending messages
    const sendMessage = async () => {
        if (input.trim() === "") return;

        // Add user message to the chat
        setMessages(prev => [...prev, { text: input, sender: "user" }]);
        setInput(""); // Clear input field

        try {
            // Send user message to backend
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();

            // Add bot response to the chat
            setMessages(prev => [...prev, { text: data.reply, sender: "bot" }]);
        } catch (error) {
            console.error('Error fetching chat reply:', error);
            setMessages(prev => [...prev, { text: "抱歉，無法處理您的訊息，請稍後再試。", sender: "bot" }]);
        }
    };

    // Function to handle getting a tarot card
    const getTarot = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tarot');
            const data = await response.json();

            // Add tarot card and explanation to the chat
            setMessages(prev => [
                ...prev,
                { text: `你抽到的塔羅牌是：${data.card}`, sender: "bot" },
                { text: `塔羅牌解釋：${data.explanation}`, sender: "bot" },
            ]);
        } catch (error) {
            console.error('Error fetching tarot card:', error);
            setMessages(prev => [...prev, { text: "抱歉，無法抽取塔羅牌，請稍後再試。", sender: "bot" }]);
        }
    };

    // Function to generate an image
    const generateImage = async () => {
        if (input.trim() === "") return;

        try {
            const response = await fetch('http://localhost:3000/api/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: input }),
            });
            const data = await response.json();

            if (data.image_url) {
                setMessages(prev => [
                    ...prev,
                    { text: `這是根據你的描述生成的圖片：`, sender: "bot" },
                    { text: data.image_url, sender: "image" },
                ]);
            } else {
                setMessages(prev => [...prev, { text: "無法生成圖片，請再試一次。", sender: "bot" }]);
            }
        } catch (error) {
            console.error('Error generating image:', error);
            setMessages(prev => [...prev, { text: "抱歉，無法生成圖片，請稍後再試。", sender: "bot" }]);
        }
    };

    return (
        <div className="container">
            <h2>戀愛機器人</h2>
            <div id="chat-box">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.sender === "user" ? "user-message" : "bot-message"}
                    >
                        {msg.sender === "image" ? (
                            <img src={msg.text} alt="Generated" />
                        ) : (
                            msg.text
                        )}
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
