import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Css/Login.css';

import Icon from '../resources/Android.png'
import Logo from '../resources/Logo.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5269/api/Login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', // pentru cookie-uri
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            const data = await response.json();
            const jwt = response.headers.get('set-cookie'); // Obține tokenul JWT din cookie-uri

            console.log(data);
            const { userId } = data;

            // Stochează JWT și userId în localStorage
            localStorage.setItem('jwt', jwt);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userEmail', email);

            setRedirect(true);
        } else {
            // Dacă autentificarea a eșuat, afișează mesajul de eroare
            setErrorMessage('Email sau parolă incorecte. Te rugăm să încerci din nou.');
        }
    };
    
    if(redirect){
        if(email === 'admin@admin.com')
            navigate('/adminPage');
        else
          navigate('/homeMaterie');
    }

    return(
        <div className='main-container main-register'>
            <div className='start-container'>
                <div className='container1'>
                    <form onSubmit={submit}>
                        <div className=' start-creare'>
                            <div>
                                <img src={Icon} alt='Imagine' className='img1'/>
                            </div>
                            <h1 className='titlu_creare_cont'>Conectare</h1>
                            <div className='inputs-login'>
                                <input type='text' className='email_class' autoComplete="EMAIL" placeholder='Email' required
                                onChange={e => setEmail(e.target.value)}
                                />
                                <input type='password' className='par_class' autoComplete="PAROLA" placeholder='Parola' required
                                onChange={e => setPassword(e.target.value)}
                                />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <div className='creare_cont_btn'>
                                    <button type='submit'>Login</button>
                                </div>
                            </div>
                            <div>
                                <p>
                                    Nu ai cont? <Link to="/register">Creaza unul</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='img-class'>
                    <img src={Logo} alt='Imagine' className='img2'/>
                </div>
            </div>
        </div>
    )
}

export default Login;