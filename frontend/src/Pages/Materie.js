import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import Clasament from './Clasament';
import '../Css/Materie.css';
import axios from 'axios';

const Materie = () => {
    const [name, setName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedMaterie } = location.state || {};
    const [activePage, setActivePage] = useState('Nivel');
    const [transitionClass, setTransitionClass] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [nivelCurent, setNivelCurent] = useState('');
    const userId = localStorage.getItem('userId');

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
        getNivelCurent();
    }, []);

    const getNivelCurent = async () => {

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

    const handleSwitch = (page) => {
        if (page !== activePage) {
            setTransitionClass(page === 'Clasament' ? 'slide-left' : 'slide-right');
            setTimeout(() => {
                setActivePage(page);
                setTransitionClass('');
            }, 400);
        }
    };

    const handleChallengeClick = () => {
        navigate('/challenge', {state: {selectedMaterie}}); 
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5269/api/Logout', null, {
                withCredentials: true // pentru cookies
            });
            setLoggedIn(false);
            localStorage.removeItem('userId');
            navigate('/'); // Redirecționează către pagina de autentificare sau altă pagină dorită
        } catch (error) {
            console.error('Eroare la deconectare:', error);
        }
    };
    
    const handleProfile = () => {
        navigate('/profile');
    };

    
    const handleComment = () => {
        navigate('/commentsPage');
    }

    const handleMenuClick = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    useEffect(() => {
        // Apply styles to the body element
        document.body.style.backgroundColor = '#f0e8ee';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.fontFamily = 'Arial, sans-serif';
        document.body.style.overflow = 'hidden';

        // Cleanup styles when component unmounts
        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.body.style.fontFamily = '';
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="materie-container">
            <div className="navbar_h">
                <h1>{selectedMaterie}</h1>
                <button className="glow-button" onClick={handleChallengeClick}>Challenge</button>
                <div className="toggle-container">
                    <div className="custom-switch">
                        <div className={`switch-background`} style={{ left: activePage === 'Nivel' ? '0' : '100px' }}></div>
                        <div
                            className={`switch-option ${activePage === 'Nivel' ? 'active' : ''}`}
                            onClick={() => handleSwitch('Nivel')}
                        >
                            Nivele
                        </div>
                        <div
                            className={`switch-option ${activePage === 'Clasament' ? 'active' : ''}`}
                            onClick={() => handleSwitch('Clasament')}
                        >
                            Clasament
                        </div>
                    </div>
                </div>
                <button className="menu-buttonH" onClick={toggleMenu}>Meniu</button>
                            {menuOpen && (
                                <div className="dropdown-menuH">
                                    <button className="buttonH" type='button' onClick={handleProfile}>Profil({name})</button>
                                    <button className='buttonH' type='button' onClick={handleComment}>Comentarii</button>
                                    <button className="buttonH" type='button' onClick={() => navigate('/homeMaterie')}>Link spre Materii</button>
                                    <button className="buttonH" type='button' onClick={handleLogout}>Deconectare</button>
                                </div>
                            )}
            </div>
            <div className={`content-container ${transitionClass}`}>
                {selectedMaterie ? (
                    activePage === 'Nivel' ? <Home selectedMaterie={selectedMaterie} /> : <Clasament selectedMaterie={selectedMaterie} />
                ) : (
                    <p>Niciun buton nu a fost apăsat.</p>
                )}
            </div>
            <div>Nivel curent: {nivelCurent}</div>
        </div>
    );
}

export default Materie;
