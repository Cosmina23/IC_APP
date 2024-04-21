// Nivel.js

const Nivel = () => {
    const params = new URLSearchParams(window.location.search);
    const nivel = params.get('level');

    return (
        <div>
            <h1>Nivelul {nivel}</h1>
        </div>
    );
};

export default Nivel;