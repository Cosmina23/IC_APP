import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [name, setName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
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
    
    return (
        <div>
            {loggedIn ? `Bună, ${name}!` : 'Nu ești conectat.'}
            <button type='submit' onClick={handleProfile}>Profil</button>
        </div>
    );
};

export default Home;


