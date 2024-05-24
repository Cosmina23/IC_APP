import React from 'react';
import { useLocation } from 'react-router-dom';

const Materie = () => {
    const location = useLocation();
    const { selectedMaterie } = location.state || {};

    return (
        <div>
            <h1>Pagina Materie</h1>
            {selectedMaterie ? (
                <p>Butonul apăsat: {selectedMaterie}</p>
            ) : (
                <p>Niciun buton nu a fost apăsat.</p>
            )}
        </div>
    );
}

export default Materie;
