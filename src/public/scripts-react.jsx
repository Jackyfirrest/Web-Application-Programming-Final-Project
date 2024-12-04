import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterSelection from "../components/CharacterSelection";
import ChatPage from "../components/ChatPage";
import axios from 'axios';

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [characters, setCharacters] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/api/character')
            .then(response => {
                setCharacters(response.data);
            })
            .catch(error => {
                console.error('Error fetching names:', error);
            });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<CharacterSelection characters={characters} setSelectedCharacter={setSelectedCharacter} />} />
                <Route path="/chat" element={<ChatPage selectedCharacter={selectedCharacter} characters={characters} />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);