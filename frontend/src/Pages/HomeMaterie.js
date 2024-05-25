import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeMaterie = () => {
    const navigate = useNavigate();

    const handleMaterieSelected = (selectedMaterie) => {
        navigate('/home', { state: { selectedMaterie } });
    }

    return (
        <>
            <button onClick={() => handleMaterieSelected('Biologie')}>Biologie </button>
            <button onClick={() => handleMaterieSelected('Romana')}> Romana </button>
            <button onClick={() => handleMaterieSelected('Istorie')}>Istorie </button>
        </>
    );
}

export default HomeMaterie;
