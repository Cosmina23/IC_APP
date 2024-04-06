import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [telefon, setTelefon] = useState('');
    const [parola, setParola] = useState('');
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
                parola
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
      navigate('/home');
    }
    
    

    return(
      <form onSubmit={submit}>
    <div className='wrraper1'>
      <h1 className='titlu_creare_cont'>Creare cont</h1>
        <div>
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
           onChange={e => setParola(e.target.value)}
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
    )
}

export default Register













