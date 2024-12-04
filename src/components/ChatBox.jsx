import React from 'react';
import AvatarGenerator from './AvatarGenerator';
import ImageComponent from './ImageComponent';

const ChatBox = ({ messages, characterImagePrompt }) => {
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
    );
};

export default ChatBox;