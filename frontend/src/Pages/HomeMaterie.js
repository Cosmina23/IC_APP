import React from 'react';
import {useNavigate } from 'react-router-dom';

const HomeMaterie = () => {
    const navigate = useNavigate();

    const handleMaterieSelected = (selectedMaterie) => {
        navigate('/materie', { state: { selectedMaterie } });
    }

    return (
        <>
            <button onClick={() => handleMaterieSelected(1)}> Buton Biologie </button>
            <button onClick={() => handleMaterieSelected(2)}> Buton2 </button>
            <button onClick={() => handleMaterieSelected(3)}> Buton3 </button>
        </>
    );
}

export default HomeMaterie;
