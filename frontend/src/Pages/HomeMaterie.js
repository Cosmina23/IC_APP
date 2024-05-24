import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeMaterie = () => {
    const navigate = useNavigate();

    const handleMaterieSelected = (selectedMaterie) => {
        navigate('/home', { state: { selectedMaterie } });
    }

    return (
        <>
            <button onClick={() => handleMaterieSelected('Biologie')}> Buton Biologie </button>
            <button onClick={() => handleMaterieSelected('Romana')}> Buton2 </button>
            <button onClick={() => handleMaterieSelected('Istorie')}> Buton3 </button>
        </>
    );
}

export default HomeMaterie;
