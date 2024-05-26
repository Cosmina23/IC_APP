import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Css/Home.css";
import { CSSTransition } from 'react-transition-group';

const HomeMaterie = () => {
    const [name, setName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Simulate fetching user data
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

    const handleMaterieSelected = (selectedMaterie) => {
        navigate('/materie', { state: { selectedMaterie } });
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
        <CSSTransition
            in={loggedIn}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <div className="container_home">
                {loggedIn ? (
                    <>
                        <div className="navbar_h">
                            <p></p>
                            <button className="menu-buttonH" onClick={toggleMenu}>Meniu</button>
                            {menuOpen && (
                                <div className="dropdown-menuH">
                                    <button className="buttonH" type='button' onClick={handleProfile}>Profil({name})</button>
                                    <button className="buttonH" type='button' onClick={handleLogout}>Deconectare</button>
                                </div>
                            )}
                        </div>
                        <div className="main-contentH">
                            <h1>Selectează Materia</h1>
                            <div className="levels-container">
                                <button className="level" onClick={() => handleMaterieSelected('Biologie')}>Biologie</button>
                                <button className="level" onClick={() => handleMaterieSelected('Romana')}>Romana</button>
                                <button className="level" onClick={() => handleMaterieSelected('Istorie')}>Istorie</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="not-logged-in">
                        <p>Nu sunteți conectat!</p>
                    </div>
                )}
            </div>
        </CSSTransition>
    );
}

export default HomeMaterie;
