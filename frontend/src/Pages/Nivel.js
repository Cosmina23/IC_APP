import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Css/Nivel.css'

const Nivel = () => {
    const params = new URLSearchParams(window.location.search);
    const nivel = params.get('level');
    const materie = params.get('materie');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]); //răspunsurile utilizatorului
    const [qnIndex, setQnIndex] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        // Add the class to the body element
        document.body.classList.add('nivel-background');
        // Clean up: Remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('nivel-background');
        };
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5269/getQuestions?level=${nivel}&course=${materie}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        fetchQuestions();

    }, [nivel, materie]);

    const handleAnswer = (selectedOptionIndex, idx) => {
        const updatedAnswers = [...answers];
        updatedAnswers[qnIndex] = { qnIndex: idx, selectedOption: selectedOptionIndex + 1 };
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        setQnIndex(prevIndex => prevIndex + 1);
    };

    const handleShowResult = () => {
        navigate('/rezultat', { state: { answers: answers, nivel: nivel, materie: materie } });
        console.log(answers);
    }

    return (
        <div className='wrraper'>
            <div>
                <h2 className='h2_nivel'>{`Question ${qnIndex + 1}`}</h2>
            </div>

            <ul>
                {questions.map((question, index) => (
                    index === qnIndex && // Afișează doar întrebarea curentă
                    <li key={index}>
                        <div className='question_asked'>{question.questionAsked}</div>
                        <ul>
                            {question.options.map((option, optionIndex) => (
                                <li className='li_q' key={optionIndex} style={{ listStyleType: 'none' }}>
                                    {/* La selectarea unui răspuns, apelează funcția handleAnswer cu indexul opțiunii */}
                                    <button className='btn_quest' onClick={() => handleAnswer(optionIndex, question.qnId)}>
                                        <div className='li_q'>{option}</div>
                                    </button>
                                </li>
                            ))}
                        </ul>

                    </li>
                ))}
            </ul>

            <div className='result-button-container'>
                {qnIndex < questions.length - 1 && ( // Afisează butonul Next doar dacă mai există întrebări
                    <button className='btn_quest' onClick={handleNext}>Next</button>
                )}

                {qnIndex === questions.length - 1 && ( //daca s-a ajuns la ultima intrebare
                    <button className='btn_quest' onClick={handleShowResult}>Vezi Rezultat</button>
                )}
            </div>
        </div>
    );
};

export default Nivel;
