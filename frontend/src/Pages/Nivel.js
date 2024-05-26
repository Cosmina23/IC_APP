import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Css/Nivel.css';

const Nivel = () => {
    const params = new URLSearchParams(window.location.search);
    const nivel = params.get('level');
    const materie = params.get('materie');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]); // răspunsurile utilizatorului
    const [qnIndex, setQnIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
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

    useEffect(() => {
        const timer = setTimeout(() => {
            handleShowResult();
        }, 300000); // 5 minutes in milliseconds

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [answers, navigate, nivel, materie]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft <= 1) {
                    clearInterval(interval);
                    handleShowResult();
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate, answers, nivel, materie]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleAnswer = (selectedOptionIndex, idx) => {
        const updatedAnswers = [...answers];
        updatedAnswers[qnIndex] = { qnIndex: idx, selectedOption: selectedOptionIndex + 1 };
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        setQnIndex(prevIndex => prevIndex + 1);
    };

    const handlePrevious = () => {
        setQnIndex(prevIndex => prevIndex - 1);
    };

    const handleShowResult = () => {
        const updatedAnswers = [...answers];
        questions.forEach((question, index) => {
            if (!updatedAnswers[index]) {
                updatedAnswers[index] = { qnIndex: question.qnId, selectedOption: 0 }; // Set unanswered questions to option 4
            }
        });
        navigate('/rezultat', { state: { answers: updatedAnswers, nivel: nivel, materie: materie } });
        console.log(updatedAnswers);
    };

    const handleQuestionClick = (index) => {
        setQnIndex(index);
    };

    return (
        <>
        <div className='question-tracker'>
            {questions.map((question, index) => (
                <div
                    key={index}
                    className={`question-number ${answers[index] ? 'answered' : ''} ${index === qnIndex ? 'current' : ''}`}
                    onClick={() => handleQuestionClick(index)}
                >
                    {index + 1}
                </div>
            ))}
            <div className='timer'>
                Timp ramas: {formatTime(timeLeft)}
            </div>
        </div>
        <div className='wrraper'>
            <div>
                <h2 className='h2_nivel'>{`Question ${qnIndex + 1} of ${questions.length}`}</h2>
            </div>
            <ul>
                {questions.map((question, index) => (
                    index === qnIndex && // Afișează doar întrebarea curentă
                    <li key={index}>
                        <div className='question_asked'><p className='p_nivel'>{question.questionAsked}</p></div>
                        <ul className='options-list'>
                            {question.options.map((option, optionIndex) => (
                                <li className='li_q' key={optionIndex} style={{ listStyleType: 'none' }}>
                                    <button
                                        className={`btn_quest1 ${answers[qnIndex]?.selectedOption === optionIndex + 1 ? 'selected' : ''}`}
                                        onClick={() => handleAnswer(optionIndex, question.qnId)}
                                    >
                                        <div className='li_q'>{option}</div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {qnIndex > 0 && ( // Afișează butonul Previous doar dacă nu suntem la prima întrebare
                <div className='previous-button-container'>
                    <button className='btn_quest' onClick={handlePrevious}>Previous</button>
                </div>
            )}

            <div className='result-button-container'>
                {qnIndex < questions.length - 1 && ( // Afișează butonul Next doar dacă mai există întrebări
                    <button className='btn_quest' onClick={handleNext}>Next</button>
                )}

                {qnIndex === questions.length - 1 && ( // Dacă s-a ajuns la ultima întrebare
                    <button className='btn_quest' onClick={handleShowResult}>Vezi Rezultat</button>
                )}
            </div>
        </div>
        </>
    );
};

export default Nivel;
