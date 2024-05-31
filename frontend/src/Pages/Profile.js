import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../Components/Popup';
import "../Css/Profile.css";
import { Link } from 'react-router-dom';
import Home from '../resources/home1.png';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Profile = () => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [prenume, setPrenume] = useState('');
    const [telefon, setTelefon] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [avatarPaths, setAvatarPaths] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const userIdLoc = localStorage.getItem('userId');
    const [totalScores, setTotalScores] = useState(null);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5269/api/Logout', {
                method: 'POST',
                credentials: 'include',
            });
            localStorage.removeItem('userId');
            window.location.href = '/';
        } catch (error) {
            console.error('Eroare la delogare:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5269/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (response.ok) {
                    const content = await response.json();
                    setUserId(content.id);
                    setName(content.nume);
                    setPrenume(content.prenume);
                    setTelefon(content.telefon);
                    setAvatar(content.avatarPath);
                    setLoggedIn(true);
                    getScores(content.id);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error('Eroare la preluarea datelor utilizatorului:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdateClick = () => {
        const updatedData = {
            nume: name,
            prenume: prenume,
            telefon: telefon,
            avatarPath: avatar
        };

        handleUpdate(userId, updatedData);
    };

    async function handleUpdate(userId, updatedData) {
        try {
            const response = await axios.put(`http://localhost:5269/api/${userId}`, updatedData);

            if (response.status === 200) {
                console.log('Date actualizate cu succes:', response.data);
                return response.data;
            } else {
                throw new Error('Cererea PUT nu a fost completată cu succes.');
            }
        } catch (error) {
            console.error('Eroare la actualizarea datelor:', error.message);
            throw error;
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePrenumeChange = (event) => {
        setPrenume(event.target.value);
    };

    const handleTelefonChange = (event) => {
        setTelefon(event.target.value);
    };

    const handlePopupClick = () => {
        handlePopup();
    };

    async function handlePopup() {
        try {
            const response = await axios.get(`http://localhost:5269/api/images`);

            if (response.status === 200) {
                setAvatarPaths(response.data);
                console.log(avatarPaths);
                return response.data;
            } else {
                throw new Error('Cererea GET nu a fost completată cu succes.');
            }
        } catch (error) {
            console.error('Eroare la actualizarea datelor:', error.message);
            throw error;
        }
    }

    const getScores = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5269/getAllTotalScores/${userId}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true // pentru cookies
            });
            if (response.status === 200) {
                setTotalScores(response.data);
            }
        } catch (error) {
            console.log('Eroare preluare scoruri totale:', error);
        }
    };

    return (
        <div className="container-profil">
            <div className="header-profil">
                <Link to="/homeMaterie"><img src={Home} alt="Imagine" className="img-home" /></Link>
                <h1>Profilul Meu</h1>
            </div>
            {loggedIn ? (
                <div className="profil-container">
                    <div className="left-section-profil">
                        <img className="imgProfil" src={`http://localhost:5269/Images/${avatar}`} alt="Descriere imagine" />

                        <div>
                            <button onClick={() => {
                                setButtonPopup(true);
                                handlePopupClick();
                            }}>Schimba poza</button>
                        </div>

                        <div>
                            <button className="btn-profil" onClick={handleUpdateClick}>Salveaza modificarile</button>
                            <button className="btn-profil" onClick={handleLogout}>Delogare</button>
                        </div>

                        <div className="pp">
                            <Popup className="pop" trigger={buttonPopup} setTrigger={setButtonPopup} avatars={avatarPaths} setAvatarFunction={setAvatar}>
                                <h1>my popup</h1>
                                <button></button>
                            </Popup>
                        </div>
                    </div>

                    <div className="dateUser-profil">
                        <div>
                            <label>
                                Nume:
                                <input type="text" name="nume" value={name} onChange={handleNameChange} className="form-control" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Prenume:
                                <input type="text" name="prenume" value={prenume} onChange={handlePrenumeChange} className="form-control" />
                            </label>
                        </div>

                        <div>
                            <label>
                                Telefon:
                                <input type="text" name="telefon" value={telefon} onChange={handleTelefonChange} className="form-control" />
                            </label>
                        </div>
                    </div>

                    {totalScores ? (
                        <TableContainer component={Paper} className="tabel">
                            <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Materie</TableCell>
                                        <TableCell align="right">Scor Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Română
                                        </TableCell>
                                        <TableCell align="right">{totalScores.romana}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Biologie
                                        </TableCell>
                                        <TableCell align="right">{totalScores.biologie}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Istorie
                                        </TableCell>
                                        <TableCell align="right">{totalScores.istorie}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <p>Se încarcă scorurile...</p>
                    )}
                </div>
            ) : (
                <div>
                    <p>Nu sunteți conectat</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
