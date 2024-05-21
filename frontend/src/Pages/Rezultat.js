import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const Rezultat = () => {
   
    const location = useLocation();
    const userAnswers = location.state.answers;
    const nivel = location.state.nivel;
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [result, setResult] = useState(0);

    
    function checkCondition(element1, element2){
        return element1.qnId === element2.qnIndex && element1.answer === element2.selectedOption;
    }
    
    const counter = (userAnswers, answers) => {
        return userAnswers.reduce((count, userAnswer) => {
    
            const matchingAnswer = answers.find(answer => checkCondition(answer, userAnswer));
            //find  returns the value of the first array element that satisfies the provided test function
    
            if (matchingAnswer) {
                return count + 1;
            }
            return count;
        }, 0);
    };
    

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await axios.get(`http://localhost:5269/getAnswers?level=${nivel}`);
                setCorrectAnswers(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        fetchAnswers();
        
    }, []);
    

    useEffect(() => {
        if (correctAnswers.length === 3) {
            const matchingCount = counter(userAnswers, correctAnswers);
            setResult(matchingCount);
        }
        
    }, [correctAnswers]);


    return (
        <div>
            <h2>Rezultate user</h2>
            <ul>
                {userAnswers.map((answer, index) => (
                    <li key={index}>{`Intrebarea ${index + 1}: Raspunsul cu id ${answer.qnIndex} este ${answer.selectedOption}`}</li>
                ))}
            </ul>
            
            <br></br>
            <h2>Rezultate corecte</h2>
            <ul>
                {correctAnswers.map((answer, index) => (
                    <li key={index}>{`Intrebarea ${index + 1}: Raspunsul cu id ${answer.qnId} este ${answer.answer}`}</li>
                ))}
            </ul>

            <div>Raspunsuri corecte: {result}</div>


        </div>
    );
};

export default Rezultat;
