import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';

const Challenge = () => {

  const location = useLocation();
  const {selectedMaterie} = location.state || {}
  const [challenge, setChallenge] = useState(null);
  
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

  return (
    <div>
      <h1>Challenge-ul Zilei: {selectedMaterie}</h1>
      {challenge && (
        <div>
          <h2>Întrebarea de azi valorează: {challenge.valoare}</h2>
          <h2>Întrebare: {challenge.question}</h2>
          <ul>
            <li>Opțiunea 1: {challenge.option1}</li>
            <li>Opțiunea 2: {challenge.option2}</li>
            <li>Opțiunea 3: {challenge.option3}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Challenge
