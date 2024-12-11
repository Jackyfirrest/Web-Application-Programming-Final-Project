import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';

const CharacterSelection = ({ characters, setSelectedCharacter, setCharacterImageUrl, customCard }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [customName, setCustomName] = useState('');
    const [customImageUrl, setCustomImageUrl] = useState('');

    const handleSelectCharacter = (key, name, imageUrl) => {
        setSelectedCharacter(name);
        setCharacterImageUrl(imageUrl);
        navigate('/chat');
    };

    const handleCustomCardClick = () => {
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (customName.trim() && customImageUrl.trim()) {
            setSelectedCharacter(customName);
            setCharacterImageUrl(customImageUrl);
            setShowModal(false);
            navigate('/chat');
        } else {
            alert('請輸入有效的名稱和圖片連結！');
        }
    };

    return (
        <div style={styles.container}>
            {/* 標題 */}
            <h1 style={styles.title}>戀愛機器人</h1>
            {/* 渲染角色卡片 */}
            <div style={styles.cardContainer}>
                {Object.keys(characters).map((key) => {
                    const character = characters[key];
                    return (
                        <div
                            key={key}
                            style={styles.card}
                            onClick={() => handleSelectCharacter(key, character.name, character.image_url)}
                        >
                            <ImageComponent description={character.image_prompt} setLoading={setLoading} />
                            <h3 style={styles.cardTitle}>{character.name}</h3>
                        </div>
                    );
                })}

                {/* 自定義角色卡片 */}
                {customCard && (
                    <div style={styles.card} onClick={handleCustomCardClick}>
                        <img src={customCard.imageUrl} alt="Custom Card" style={styles.image} />
                        <h3 style={styles.cardTitle}>{customCard.title}</h3>
                        <p style={styles.cardDescription}>{customCard.description}</p>
                    </div>
                )}
            </div>

            {/* 自定義角色 Modal */}
            {showModal && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h3 style={styles.modalTitle}>新增自訂角色</h3>
                        <input
                            type="text"
                            placeholder="請新增角色名稱"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="放入角色圖片連結"
                            value={customImageUrl}
                            onChange={(e) => setCustomImageUrl(e.target.value)}
                            style={styles.input}
                        />
                        <div style={styles.buttonContainer}>
                            <button onClick={handleSubmit} style={styles.button}>
                                確認
                            </button>
                            <button onClick={() => setShowModal(false)} style={styles.button}>
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #FFC1CC, #FF9999)', // 粉色漸變背景
    },
    title: {
        fontFamily: "'Noto Sans TC', sans-serif",
        fontWeight: 'bold',
        color: '#D32F2F',
        fontSize: '2.5rem',
        marginBottom: '30px',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        border: '1px solid #FFCDD2',
        borderRadius: '10px',
        backgroundColor: '#FFF1F3',
        width: '180px',
        padding: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '260px', // 確保高度一致
    },
    image: {
        width: '100%',
        height: '120px',
        objectFit: 'contain', // 使用 `contain` 確保圖片保持原比例
        borderRadius: '8px',
        backgroundColor: '#FFE4E1', // 為小圖片添加背景色
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontFamily: "'Noto Sans TC', sans-serif",
        fontWeight: 'bold',
        color: '#D81B60',
        margin: '10px 0 5px',
    },
    cardDescription: {
        fontFamily: "'Noto Sans TC', sans-serif",
        color: '#757575',
        fontSize: '0.9rem',
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
    },
    modal: {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        textAlign: 'center',
    },
    modalTitle: {
        fontFamily: "'Noto Sans TC', sans-serif",
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    input: {
        width: '90%',
        padding: '8px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #FFCDD2',
        fontFamily: "'Noto Sans TC', sans-serif",
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '15px',
        gap: '10px', // 添加間距
    },
    button: {
        flex: 1,
        padding: '10px', // 統一按鈕内邊距
        backgroundColor: '#FF6F61',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: "'Noto Sans TC', sans-serif",
        fontSize: '1rem',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        textAlign: 'center',
    },
};

export default CharacterSelection;
