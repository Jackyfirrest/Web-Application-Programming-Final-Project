import React from 'react';
import AvatarGenerator from './AvatarGenerator';
import ImageComponent from './ImageComponent';

const ChatBox = ({ messages, characterImagePrompt, characterImageUrl }) => {
    return (
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
                                {characterImageUrl ? (
                                    <img
                                        src={characterImageUrl}
                                        alt="Avatar"
                                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                                    />
                                ) : (
                                    characterImagePrompt && <AvatarGenerator prompt={characterImagePrompt} />
                                )}
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
    );
};

export default ChatBox;