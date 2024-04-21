import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Home.css";

const Home = () => {
    const [name, setName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5269/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', //for cookies
                });
                if (response.ok) {
                    const content = await response.json();
                    setName(content.nume);
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error('Eroare la preluarea datelor utilizatorului:', error);
            }
        };

        fetchData();
    }, []);

    const handleProfile = () =>{
        navigate('/profile');
    }

    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
    }

    const handlePlay = () => {
        if (selectedLevel !== null) {
            navigate(`/nivel?level=${selectedLevel}`);
        } else {
            console.error('Niciun nivel selectat.');
        }
    }
    
    return (
        <div>
            {loggedIn ? `Bună, ${name}!` : 'Nu ești conectat.'}
            <button type='submit' onClick={handleProfile}>Profil</button>
            <div className="levels-container">
                <button className="level" onClick={() => handleLevelSelect(1)}>Nivel 1</button>
                <button className="level" onClick={() => handleLevelSelect(2)}>Nivel 2</button>
                <button className="level" onClick={() => handleLevelSelect(3)}>Nivel 3</button>
                <button className="level" onClick={() => handleLevelSelect(4)}>Nivel 4</button>
                <button className="level" onClick={() => handleLevelSelect(5)}>Nivel 5</button>
            </div>
            <button type='submit' onClick={handlePlay}>Joacă</button>
        </div>
    );
};

export default Home;