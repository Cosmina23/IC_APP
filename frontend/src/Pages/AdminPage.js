import React from 'react'
import { Link } from "react-router-dom";

const AdminPage = () => {

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

  return (
    <div className='main-container-admin'>
         <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="btn-profil-admin"><Link to={'/addChallenge'}>Adauga intrebarea zilei</Link></button>
      <button className="btn-profil-admin"><Link to={'/addQuestions'}>Adauga intrebare pentru nivel</Link></button>
    </div>
  )
}

export default AdminPage
