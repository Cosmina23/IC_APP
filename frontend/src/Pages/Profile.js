import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../Components/Popup';

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
            // După ce utilizatorul este delogat, redirecționează-l către pagina de înregistrare
            window.location.href = '/register'; // sau altă metodă de redirecționare
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
        <div>
            <h1 style={{'textAlign': 'center'}}>Profilul Utilizatorului</h1>
            {loggedIn ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <div className='pozaUser'>
                        <h2>Poza de profil</h2>
                        <img src={`http://localhost:5269/Images/${avatar}`} alt="Descriere imagine" 
                            style={{ width: '200px', height: 'auto' }}/>

                        <div>
                            <button onClick={() => {
                                setButtonPopup(true);
                                handlePopupClick();
                            }}>Schimba poza</button>
                        </div>

                        <div>
                            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} avatars={avatarPaths} setAvatarFunction={setAvatar}>
                                <h1>my popup</h1>
                                <button ></button>
                            </Popup>
                        </div>
                    </div>

                    <div className="dateUser" style={{ textAlign: 'center', fontSize: '1.5rem' }}>
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

                        <br></br>
                        <button onClick={handleUpdateClick}>Modifica</button>

                        <br></br>
                        <button onClick={handleLogout}>Delogare</button>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                    <p>Nu sunteți conectat</p>
                </div>
            )}

        </div>
    );
};

export default Profile;
