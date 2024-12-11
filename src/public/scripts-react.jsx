import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import CharacterSelection from "../components/CharacterSelection";
import ChatPage from "../components/ChatPage";
import axios from 'axios';

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [characters, setCharacters] = useState({});
    const [characterImageUrl, setCharacterImageUrl] = useState("");

    useEffect(() => {
        const character = localStorage.getItem("CHARACTER");
        if (character !== null) setSelectedCharacter(character);
    }, []);

    useEffect(() => {
        if (selectedCharacter) localStorage.setItem("CHARACTER", selectedCharacter);
    }, [selectedCharacter]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/character')
            .then(response => {
                setCharacters(response.data);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <CharacterSelection
                                characters={characters}
                                setSelectedCharacter={setSelectedCharacter}
                                setCharacterImageUrl={setCharacterImageUrl}
                                customCard={{
                                    title: '自訂角色',
                                    description: '創建屬於你的角色吧！',
                                    imageUrl: 'https://media.istockphoto.com/id/518552551/photo/male-silhouette-profile-picture-with-question-mark.jpg?s=612x612&w=0&k=20&c=vCJR4RK29efe_TCPtPdhArezQvp1lcyOMAJ80I8hNOA=', // 自定義卡牌圖片
                                }}
                            />
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            <ChatPage
                                selectedCharacter={selectedCharacter}
                                characters={characters}
                                characterImageUrl={characterImageUrl}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
