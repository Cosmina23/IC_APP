import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import '../Css/Challenge.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Challenge = () => {

  const location = useLocation();
  const {selectedMaterie} = location.state || {}
  const [challenge, setChallenge] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
      setSelectedOption(option);
  };
  
    useEffect(() => {
      const fetchChallenge = async () => {
        try {
          const response = await axios.get('http://localhost:5269/getChallenge', {
            params: { course: selectedMaterie } // Schimbă cursul după cum este necesar
          });
          setChallenge(response.data);
        } catch (error) {
          console.log(`Eroare la preluarea challenge`)
        }
      };
  
      fetchChallenge();
    }, []);

    const addScore = async () => {
      
      if (!userId) {
          console.log('nu exista userid, conectati-va din nou');
          return;
      }

      try {
          const response = await axios({
              method: 'PUT',
              url: `http://localhost:5269/updateScore/${userId}`,
              headers: { 'Content-Type': 'application/json' },
              params: { level: 0, course: selectedMaterie },
              data: challenge.valoare,
              });

          if (response.status === 200) {
          console.log('Scor adaugat cu succes');
          } else {
          console.error('Failed to add score, status code:', response.status);
          }
      } catch (error) {
          console.error('Eroare la adaugarea scorului:', error);
      }
  };

  const addAttempt = async () => {
      
    if (!userId) {
        console.log('nu exista userid, conectati-va din nou');
        return;
    }

    try {
        const response = await axios({
            method: 'PUT',
            url: `http://localhost:5269/storeAttempt/${userId}`,
            headers: { 'Content-Type': 'application/json' },
            params: { course: selectedMaterie },
            });

        if (response.status === 200) {
        console.log('attempt adaugat cu succes');
        } else {
        console.error('Failed to add attempt, status code:', response.status);
        }
    } catch (error) {
        console.error('Eroare la adaugarea attempt-ului:', error);
    }
};


    const handleResultClick = async () => {
      if (!selectedOption) {
          toast.error('Te rog să selectezi o opțiune.');
          return;
      }

      const correctAnswer = `option${challenge.answer}`; // Assuming `answer` is 1, 2, or 3

      if (selectedOption === correctAnswer) {
        addScore();
        addAttempt();
        toast.success(`Răspunsul este corect, ai obținut ${challenge.valoare} de puncte!`);

        setTimeout(() => {
          navigate('/materie', { state: { selectedMaterie } })
        }, 4000);
      } else {
        addAttempt();
        toast.error(`Răspunsul este greșit!`);

        setTimeout(() => {
          navigate('/materie', { state: { selectedMaterie } })
        }, 4000);
      }
    };

  return (
    <div>
      
      {challenge && (
        <div className='wrraper2'>
          
          <h2 className='h2_challenge'>Întrebarea de azi valorează: {challenge.valoare} de puncte</h2>
          <div className="question">{challenge.question}</div>
          <ul className="options-list">
            <li
                className={`option ${selectedOption === 'option1' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('option1')}
            >
                {challenge.option1}
            </li>
            <li
                className={`option ${selectedOption === 'option2' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('option2')}
            >
                {challenge.option2}
            </li>
            <li
                className={`option ${selectedOption === 'option3' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('option3')}
            >
                {challenge.option3}
            </li>
            </ul>

            <button className='btn_challenge' onClick={handleResultClick}>Vezi Rezultat</button>
        </div>
      )}
       <ToastContainer />
    </div>
  )
}

export default Challenge
