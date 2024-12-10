import React from "react";

const InputContainer = ({ input, setInput, handleKeyDown, sendMessage, getTarot, generateImage }) => {
    return (
        <div>
            {/* 輸入框和發送按鈕 */}
            <div className="input-container" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="說些什麼吧..."
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "20px",
                        border: "1px solid #FFCDD2",
                        fontFamily: "'Noto Sans TC', sans-serif",
                        fontSize: "1rem",
                    }}
                />
                <button
                    style={{
                        backgroundColor: "#FF6F61",
                        color: "#FFFFFF",
                        padding: "10px 20px",
                        borderRadius: "20px",
                        border: "none",
                        fontSize: "1rem",
                        fontFamily: "'Noto Sans TC', sans-serif",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        transition: "background-color 0.3s ease",
                    }}
                    onClick={sendMessage}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FF8A80")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF6F61")}
                >
                    💌 發送
                </button>
            </div>

            {/* 其他按鈕 */}
            <div
                className="extra-buttons"
                style={{
                    display: "flex",
                    justifyContent: "space-between", // 按鈕兩側分佈
                    marginTop: "20px",
                }}
            >
                <div
                    style={{
                        width: "50%", // 每個按鈕區域占一半
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button
                        style={{
                            backgroundColor: "#FF8A80",
                            color: "#FFFFFF",
                            width: "66.67%", // 區域的 2/3 寬度
                            padding: "10px",
                            borderRadius: "20px",
                            border: "none",
                            fontSize: "1rem",
                            fontFamily: "'Noto Sans TC', sans-serif",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                            textAlign: "center",
                        }}
                        onClick={getTarot}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFCDD2")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF8A80")}
                    >
                        🔮 抽塔羅牌
                    </button>
                </div>
                <div
                    style={{
                        width: "50%", // 每個按鈕區域占一半
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button
                        style={{
                            backgroundColor: "#FF8A80",
                            color: "#FFFFFF",
                            width: "66.67%", // 區域的 2/3 寬度
                            padding: "10px",
                            borderRadius: "20px",
                            border: "none",
                            fontSize: "1rem",
                            fontFamily: "'Noto Sans TC', sans-serif",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                            textAlign: "center",
                        }}
                        onClick={generateImage}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFCDD2")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF8A80")}
                    >
                        🎨 生成圖片
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputContainer;


