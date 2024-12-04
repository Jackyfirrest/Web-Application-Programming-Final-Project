import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';

const CharacterSelection = ({ characters, setSelectedCharacter, setCharacterImageUrl }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleSelectCharacter = (key, imageUrl) => {
        setSelectedCharacter(key);
        setCharacterImageUrl(imageUrl);
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
                        onClick={() => handleSelectCharacter(key, character.image_url)}
                    >
                        <ImageComponent description={character.image_prompt} setLoading={setLoading} />
                        <h3>{character.name}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default CharacterSelection;