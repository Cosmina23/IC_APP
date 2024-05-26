import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../Components/Popup';
import "../Css/Profile.css";
import { Link } from 'react-router-dom';
import Home from '../resources/home1.png';

const Profile = () => {

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [prenume, setPrenume] = useState('');
    const [telefon, setTelefon] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [avatarPaths, setAvatarPaths] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    
    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5269/api/Logout', {
                method: 'POST',
                credentials: 'include', // pentru cookies
            });
            localStorage.removeItem('userId');
            // După ce utilizatorul este delogat, redirecționează-l către pagina de înregistrare
            window.location.href = '/'; // sau altă metodă de redirecționare
        } catch (error) {
            console.error('Eroare la delogare:', error);
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5269/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', //for cookies
                });
                if (response.ok) {
                    const content = await response.json();
                    setUserId(content.id)
                    setName(content.nume);
                    setPrenume(content.prenume);
                    setTelefon(content.telefon);
                    setAvatar(content.avatarPath);
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


    const handleUpdateClick = () => {
        const updatedData = { 
            nume: name, 
            prenume: prenume, 
            telefon: telefon,
            avatarPath: avatar
        };

        handleUpdate(userId, updatedData);
    };

    // Define the handleUpdate function
    async function handleUpdate(userId, updatedData) {
    try {
        //funcția axios.put pentru a face cererea PUT
        const response = await axios.put(`http://localhost:5269/api/${userId}`, updatedData);

        // Verificam daca cererea a fost completată cu succes
        if (response.status === 200) {
            console.log('Date actualizate cu succes:', response.data);
            return response.data; // returnează datele actualizate
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
            //funcția axios.put pentru a face cererea PUT
            const response = await axios.get(`http://localhost:5269/api/images`);
    
            // Verificam daca cererea a fost completată cu succes
            if (response.status === 200) {
                setAvatarPaths(response.data);
                console.log(avatarPaths)
                return response.data; // returnează datele actualizate
            } else {
                throw new Error('Cererea GET nu a fost completată cu succes.');
            }
            } catch (error) {
                console.error('Eroare la actualizarea datelor:', error.message);
                throw error;
            }
        }
      

    return (
        <div className='container'>
        <div className='header'>
            <Link to='/homeMaterie'><img src={Home} alt='Imagine' className='img-home' /></Link>
            <h1>Profilul Meu</h1>
        </div>
            {loggedIn ? (
                <div className='profil-container'>
                    

                    <div className='left-section'>
                        <img className='imgProfil' src={`http://localhost:5269/Images/${avatar}`} alt="Descriere imagine" style={{ width: '400px', height: '300' }}/>

                        <div>
                            <button onClick={() => {
                                setButtonPopup(true);
                                handlePopupClick();
                            }}>Schimba poza</button>
                        </div>
                        
                        <div className='pp'>
                            <Popup className='pop' trigger={buttonPopup} setTrigger={setButtonPopup} avatars={avatarPaths} setAvatarFunction={setAvatar}>
                                <h1>my popup</h1>
                                <button ></button>
                            </Popup>
                        </div>
                    </div>
                    
                    <div>
                    <div className="dateUser">
                        <div>
                        <div>
                            <label>
                                Nume:
                                <input type="text" name="nume" value={`${name}`} onChange={handleNameChange} />
                            </label>
                        </div>

                        <div>
                            <label>
                                Prenume:
                                <input type="text" name="prenume" value={`${prenume}`} onChange={handlePrenumeChange}/>
                            </label>
                        </div>

                        <div>
                            <label>
                                Telefon:
                                <input type="text" name="telefon" value={`${telefon}`} onChange={handleTelefonChange}/>
                            </label>
                        </div>
                        </div>

                        <div className='but'>
                            <button className='btn' onClick={handleUpdateClick}>Salveaza modificarile</button>
                            <button className='btn' onClick={handleLogout}>Delogare</button>
                        </div>
                    </div>
                    <div className='tabel'>
                        TABEL NIVEL
                    </div>
                    </div>
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
