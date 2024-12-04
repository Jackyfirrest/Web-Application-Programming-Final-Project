import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterSelection = ({ characters, setSelectedCharacter }) => {
    const navigate = useNavigate();

    const handleSelectCharacter = (key) => {
        setSelectedCharacter(key);
        navigate('/chat');
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Object.keys(characters).map((key) => {
                const character = characters[key];
                return (
                    <div
                        key={key}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '150px',
                            textAlign: 'center'
                        }}
                        onClick={() => handleSelectCharacter(key)}
                    >
                        <img
                            src={character.image_url || 'default-avatar.png'}
                            alt={character.name}
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                        <h3>{character.name}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default CharacterSelection;