import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Register.css'
import '../index.css'
import Icon from '../resources/Android.png'
import Logo from '../resources/Logo.png'

const Register = () => {
    const [email, setEmail] = useState('');
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [telefon, setTelefon] = useState('');
    const [password, setPassword] = useState('');
    const navigate  = useNavigate();

    const [redirect, setRedirect] = useState(false);


    const submit = async(e) => {
      e.preventDefault();//pentru a opri functia implicita de refresh a form=ului

      try {
        await fetch(' http://localhost:5269/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nume,
                prenume,
                telefon,
                email,
                password
            })
        });
        //daca backend a raspuns

        setRedirect(true);

      } catch (error) {
        console.error('Eroare la trimiterea cererii către server:', error);
        // Daca apare o eroare
    }
  };
  
    if(redirect){    
      navigate('/login');
    }
    
    

    return(
      <>
        <div className='main-container main-register'>
        <div className='start-container'>
            <div className='container1'>
              <form onSubmit={submit}>
              <div className=' start-creare'>
                <div>
                  <img src={Icon} alt='Imagine' className='img1'/>
                </div>
                <h1 className='titlu_creare_cont'>Creare cont</h1>
                <div  className='inputs-register'>
                  <input type='text' className='email_class' autoComplete="EMAIL" placeholder='Email' required
                  onChange={e => setEmail(e.target.value)}
                  />
                  <input type='text' className='nume_class' autoComplete="NUME" placeholder='Nume' required
                  onChange={e => setNume(e.target.value)}
                  />
                  <input type='text' className='prenume_class' autoComplete="PRENUME" placeholder='Prenume' required
                  onChange={e => setPrenume(e.target.value)}
                  />
                  <input type='text' className='telefon_class' autoComplete="TELEFON" placeholder='Telefon'required
                  onChange={e => setTelefon(e.target.value)}
                  />
                  <input type='password' className='par_class'  autoComplete="PAROLA" placeholder='Parola'required
                  onChange={e => setPassword(e.target.value)}
                  />
                </div>    
                <div className='creare_cont_btn'>
                  <button type='submit'>Creeaza cont</button>
                </div>
                <div>
                  <p>
                    Ai deja cont? <Link to="/login">Logare</Link>
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
        </>
  )
}

export default Register













