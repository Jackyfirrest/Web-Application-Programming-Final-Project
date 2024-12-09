import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';

const CharacterSelection = ({ characters, setSelectedCharacter, setCharacterImageUrl, customCard }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [customName, setCustomName] = useState('');
    const [customImageUrl, setCustomImageUrl] = useState('');

    // 處理選擇角色
    const handleSelectCharacter = (key, name, imageUrl) => {
        setSelectedCharacter(name);
        setCharacterImageUrl(imageUrl);
        navigate('/chat');
    };

    // 點擊自定義卡片，打開 Modal
    const handleCustomCardClick = () => {
        setShowModal(true);
    };

    // 提交自定義角色
    const handleSubmit = () => {
        if (customName.trim() && customImageUrl.trim()) {
            setSelectedCharacter(customName); // 設置角色名稱
            setCharacterImageUrl(customImageUrl); // 設置圖片 URL
            setShowModal(false); // 關閉 Modal
            navigate('/chat'); // 跳轉至聊天頁面
        } else {
            alert('Please enter a valid name and image URL.');
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {/* 自定義卡片 */}
            {customCard && (
                <div
                    style={styles.card}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={handleCustomCardClick}
                >
                    <img
                        src={customCard.imageUrl}
                        alt="Custom Card"
                        style={styles.image}
                    />
                    <h3>{customCard.title}</h3>
                    <p>{customCard.description}</p>
                </div>
            )}

            {/* 懸浮視窗 Modal */}
            {showModal && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h3>新增自訂角色</h3>
                        <input
                            type="text"
                            placeholder="請新增角色印象名稱（如霸道總裁）"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="放入你的角色圖片連結"
                            value={customImageUrl}
                            onChange={(e) => setCustomImageUrl(e.target.value)}
                            style={styles.input}
                        />
                        <div style={styles.buttonContainer}>
                            <button
                                onClick={handleSubmit}
                                style={styles.button}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                確認
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                style={styles.button}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 渲染角色卡片 */}
            {Object.keys(characters).map((key) => {
                const character = characters[key];
                return (
                    <div
                        key={key}
                        style={styles.card}
                        onClick={() => handleSelectCharacter(key, character.name, character.image_url)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <ImageComponent description={character.image_prompt} setLoading={setLoading} />
                        <h3>{character.name}</h3>
                    </div>
                );
            })}
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        cursor: 'pointer',
        width: '150px',
        textAlign: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        animation: 'slideIn 0.3s',
    },
    input: {
        width: '90%',
        padding: '8px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px', // 按鈕之間的間距
        marginTop: '15px',
    },
    button: {
        padding: '8px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        flex: '1', // 按鈕平分空間
        maxWidth: '100px', // 限制按鈕最大寬度
        transition: 'transform 0.2s, background-color 0.2s',
    },
};

// 添加 CSS 动画
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    @keyframes slideIn {
        from { transform: translateY(-20px); }
        to { transform: translateY(0); }
    }
`, styleSheet.cssRules.length);

export default CharacterSelection;