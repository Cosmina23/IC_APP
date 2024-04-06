
import { Link } from 'react-router-dom';

export default function Start(){
    return(
        <>
        <div>
            <p>
                Nu ai cont? <Link to="/register">Inregistreaza-te!</Link>
            </p>
            <p>
                Ai deja cont? <Link to="/login">Logare!</Link>
            </p>
        </div>
        </>
    )
}