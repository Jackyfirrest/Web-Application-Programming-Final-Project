import React from 'react';

const InputContainer = ({ input, setInput, handleKeyDown, sendMessage, getTarot, generateImage }) => {
    return (
        <div>
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

export default InputContainer;