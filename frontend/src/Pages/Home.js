import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "../Css/Home.css";

const Home = () => {
    const [name, setName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredLevel, setHoveredLevel] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedMaterie } = location.state || {}; // primește materia selectată

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

    const handleProfile = () => {
        navigate('/profile');
    }

    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
    }

    const handlePlay = () => {
        if (selectedLevel !== null) {
            navigate(`/nivel?level=${selectedLevel}&materie=${selectedMaterie}`);
        } else {
            console.error('Niciun nivel selectat.');
        }
    }
    

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleLevelHover = (level) => {
        setHoveredLevel(level);
    }

    const handleLevelLeave = () => {
        setHoveredLevel(null);
    }

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5269/api/Logout', null, {
                withCredentials: true // pentru cookies
            });
            setLoggedIn(false);
            navigate('/'); // Redirecționează către pagina de autentificare sau altă pagină dorită
        } catch (error) {
            console.error('Eroare la deconectare:', error);
        }
    };

    return (
        <div className="container_home">
            {loggedIn ? (
                <>
                    <div className="navbar_h">
                        <p>NUME MATERIE SAU CEVA</p>
                        <button className="menu-buttonH" onClick={toggleMenu}>Meniu</button>
                        {menuOpen && (
                            <div className="dropdown-menuH">
                                <button className="buttonH" type='button' onClick={handleProfile}>Profil({name})</button>
                                <button className="buttonH" type='button' onClick={() => navigate('/....')}>Link spre Materii</button>
                                <button className="buttonH" type='button' onClick={handleLogout}>Deconectare</button>
                            </div>
                        )}
                    </div>
                    <div className="main-contentH">
                        <div className="levels-wrapper">
                            <div className="levels-container">
                                {levels.length > 0 ? (
                                    levels.map(level => (
                                       <button 
                                        key={level} 
                                        className={`level ${selectedLevel === level ? 'selected' : ''} ${hoveredLevel === level ? 'hovered' : ''}`} 
                                        onClick={() => handleLevelSelect(level)}
                                        onMouseEnter={() => handleLevelHover(level)}
                                        onMouseLeave={handleLevelLeave}>
                                        Nivel {level}
                                    </button>
                                    ))
                                ) : (
                                    <p>Nu există nivele disponibile</p>
                                )}
                            </div>
                            <button className="play-button" type='button' onClick={handlePlay}>Joacă</button>
                        </div>
                    </div>
                    <div>
                    <h1>Pagina Materie</h1>
                        {selectedMaterie ? (
                            <p>Butonul apăsat: {selectedMaterie}</p>
                        ) : (
                            <p>Niciun buton nu a fost apăsat.</p>
                        )}
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
