import React from 'react';

const Profile = () => {

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5269/api/Logout', {
                method: 'POST',
                credentials: 'include', // pentru cookies
            });
            // După ce utilizatorul este delogat, redirecționează-l către pagina de înregistrare
            window.location.href = '/'; // sau altă metodă de redirecționare
        } catch (error) {
            console.error('Eroare la delogare:', error);
        }
    };

    return (
        <div>
            <h1>Profilul Utilizatorului</h1>
            <p>Aici sunt informațiile profilului utilizatorului...</p>
            <button onClick={handleLogout}>Delogare</button>
        </div>
    );
};

export default Profile;
