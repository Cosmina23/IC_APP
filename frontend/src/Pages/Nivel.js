// Nivel.js
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Nivel = () => {
    const params = new URLSearchParams(window.location.search);
    const nivel = params.get('level');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]); //răspunsurile utilizatorului
    const [qnIndex, setQnIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5269/getQuestions?level=${nivel}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        fetchQuestions();

    }, []);

    const handleAnswer = (selectedOptionIndex, idx) => {
        const updatedAnswers = [...answers];
        updatedAnswers[qnIndex] = { qnIndex: idx, selectedOption: selectedOptionIndex + 1 };
        setAnswers(updatedAnswers);
    };
    

    const handleNext = () => {
        setQnIndex(prevIndex => prevIndex + 1);
    };

    const handleShowResult = () => {
        navigate('/rezultat',{state:{answers: answers, nivel: nivel}});
        console.log(answers);
    }

    return (
        <div>

            <div>
                <h2>{`Question ${qnIndex + 1}`}</h2>
            </div>

            <ul>
                {questions.map((question, index) => (
                    index === qnIndex && // Afișează doar întrebarea curentă
                    <li key={index}>
                        <div>{question.questionAsked}</div>
                        <ul>
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex} style={{ listStyleType: 'none' }}>
                                    {/* La selectarea unui răspuns, apelează funcția handleAnswer cu indexul opțiunii */}
                                    <button onClick={() => handleAnswer(optionIndex, question.qnId)}>
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>

                    </li>
                ))}
            </ul>

            

            {qnIndex < questions.length - 1 && ( // Afisează butonul Next doar dacă mai există întrebări
                <button onClick={handleNext}>Next</button>
            )}

            {qnIndex === questions.length - 1 && ( //daca s-a ajuns la ultima intrebare
                <button onClick={handleShowResult}>Vezi Rezultat</button>
            )}
        </div>
    );
};

export default Nivel;
