import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from 'axios';
import "../Css/Home.css";

const Home = () => {
    const [name, setName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [hoveredLevel, setHoveredLevel] = useState(null);
    const [nivelCurent, setNivelCurent] = useState(1); // Nivelul curent al utilizatorului
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedMaterie } = location.state || {}; // primește materia selectată
    const userId = localStorage.getItem('userId'); // Obține userId din localStorage

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5269/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true // pentru cookies
                });
                if (response.status === 200) {
                    const content = response.data;
                    setName(content.nume);
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error('Eroare la preluarea datelor utilizatorului:', error);
                setLoggedIn(false);
            }
        };

        fetchUserData();
        fetchNivelCurent(); // Obține nivelul curent
    }, []);

    useEffect(() => {
        if (selectedMaterie) {
            const fetchLevels = async () => {
                try {
                    const response = await axios.get(`http://localhost:5269/getLevels?materie=${selectedMaterie}`, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true // pentru cookies
                    });
                    console.log('Response data:', response.data); // Debugging log
                    if (response.data.length > 0) {
                        setLevels(response.data.sort((a, b) => a - b));
                    } else {
                        console.log('No levels found');
                    }
                } catch (error) {
                    console.error('Eroare la preluarea nivelelor:', error);
                }
            };

            fetchLevels();
        }
    }, [selectedMaterie]);

    const fetchNivelCurent = async () => {
        try {
            const response = await axios.get(`http://localhost:5269/getNivelCurent/${userId}`, {
                params: { course: selectedMaterie },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true // pentru cookies
            });
            if (response.status === 200) {
                setNivelCurent(response.data.currentLevel);
            }
        } catch (error) {
            console.log('Eroare preluare nivel curent');
        }
    };

    const handleLevelSelect = (level) => {
        if (level <= nivelCurent) {
            setSelectedLevel(level);
        } else {
            console.error('Nu puteți accesa acest nivel încă.');
        }
    }

    const handlePlay = () => {
        if (selectedLevel !== null) {
            navigate(`/nivel?level=${selectedLevel}&materie=${selectedMaterie}`);
        } else {
            console.error('Niciun nivel selectat.');
        }
    }

    const handleLevelHover = (level) => {
        setHoveredLevel(level);
    }

    const handleLevelLeave = () => {
        setHoveredLevel(null);
    }

    const renderLevelsWithArrows = () => {
        const elements = [];
        for (let i = 0; i < levels.length; i++) {
            const level = levels[i];
            const row = Math.floor(i / 4) + 1;
            const column = i % 4 + 1;
            const reverseRow = row % 2 === 0; // Reverse on every second row
            const gridColumn = reverseRow ? 5 - column : column;

            elements.push(
                <button 
                    key={level} 
                    className={`level ${selectedLevel === level ? 'selected' : ''} ${hoveredLevel === level ? 'hovered' : ''} ${level > nivelCurent ? 'disabled' : ''}`} 
                    onClick={() => handleLevelSelect(level)}
                    onMouseEnter={() => handleLevelHover(level)}
                    onMouseLeave={handleLevelLeave}
                    style={{
                        gridColumn: gridColumn,
                        gridRow: row
                    }}
                    disabled={level > ({nivelCurent}+1)} // Disable button if level is greater than current level
                >
                    Nivel {level}
                </button>
            );

            // Add arrows
            if (i < levels.length - 1) {
                const nextRow = Math.floor((i + 1) / 4) + 1;
                const nextColumn = (i + 1) % 4 + 1;
                const nextReverseRow = nextRow % 2 === 0;
                const nextGridColumn = nextReverseRow ? 5 - nextColumn : nextColumn;

                if (nextGridColumn > gridColumn) {
                    elements.push(
                        <div
                            key={`arrow-${level}`}
                            className="arrow right"
                            style={{
                                gridColumn: gridColumn + 1,
                                gridRow: row
                            }}
                        >
                            ━━━━━━
                        </div>
                    );
                } else if (nextGridColumn < gridColumn) {
                    elements.push(
                        <div
                            key={`arrow-${level}`}
                            className="arrow left"
                            style={{
                                gridColumn: gridColumn - 1,
                                gridRow: row
                            }}
                        >
                        ━━━━━━
                        </div>
                    );
                } else if (nextGridColumn === gridColumn && nextRow > row) {
                    elements.push(
                        <div
                            key={`arrow-${level}`}
                            className="arrow down"
                            style={{
                                gridColumn: gridColumn,
                                gridRow: row + 1
                            }}
                        >
                            ↓
                        </div>
                    );
                }
            }
        }
        return elements;
    }

    return (
        <div className="container_home">
            {loggedIn ? (
                <>
                    <div className="main-contentH">
                        <div className="levels-wrapper">
                            <div className="levels-container">
                                {levels.length > 0 ? renderLevelsWithArrows() : <p>Nu există nivele disponibile</p>}
                            </div>
                            <div className="button-container">
                                <button className="play-button" type='button' onClick={handlePlay}>Joacă</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="not-logged-in">
                    <p>Nu sunteți conectat!</p>
                </div>
            )}
        </div>
    );
};

export default Home;

