import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [parola, setParola] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        
            await fetch(' http://localhost:5269/api/Login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',//for cookies
                body: JSON.stringify({
                    email,
                    parola
                })
            });
            //if backend worked

            setRedirect(true);

    }
    
    if(redirect){
      navigate('/home');
    }

    return(
        <form onSubmit={submit}>
        <h1>Conectare</h1>
                <div>
                    <input type='text' className='email_class' autoComplete="EMAIL" placeholder='Email' required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type='text' className='par_class' autoComplete="PAROLA" placeholder='Parola' required
                        onChange={e => setParola(e.target.value)}
                    />
                   
                    <button type='submit'>Login</button>
                </div>
                <div>
                    <p>
                        Nu ai cont? <Link to="/register">Creeaza unul</Link>
                    </p>
                </div>
        </form>
    )
}

export default Login;