import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Css/Rezultat.css'

const Rezultat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userAnswers = location.state.answers || [];
    const nivel = location.state.nivel;
    const materie = location.state.materie;
    const [questions, setQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [result, setResult] = useState(0);
    const [scoreImage, setScoreImage] = useState('');
    const [imagePath, setImagePath] = useState('');

    function checkCondition(element1, element2) {
        return element1.qnId === element2.qnIndex && element1.answer === element2.selectedOption;
    }

    const counter = (userAnswers, answers) => {
        return answers.reduce((count, answer) => {
            const userAnswer = userAnswers.find(userAnswer => userAnswer.qnIndex === answer.qnId);
            if (userAnswer && checkCondition(answer, userAnswer)) {
                return count + 1;
            }
            return count;
        }, 0);
    };

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
        const fetchAnswers = async () => {
            try {
                const response = await axios.get(`http://localhost:5269/getAnswersWithIds?level=${nivel}&course=${materie}`);
                setCorrectAnswers(response.data);
            } catch (error) {
                console.error('Error fetching answers:', error);
            }
        }

        fetchAnswers();
    }, [nivel, materie]);

    useEffect(() => {
        if (correctAnswers.length > 0) {
            const matchingCount = counter(userAnswers, correctAnswers);
            setResult(matchingCount);
            const scorePercentage = (matchingCount / correctAnswers.length) * 100;
            selectImage(scorePercentage);
        }
    }, [correctAnswers]);

    useEffect(() => {
        if (result > 0) {
          addScore();
        }
    }, [result]);

    const addScore = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.log('nu exista userid, conectati-va din nou');
            return;
        }

        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:5269/updateScore/${userId}`,
                headers: { 'Content-Type': 'application/json' },
                params: { level: nivel, course: materie },
                data: result,
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

    const selectImage = (scorePercentage) => {
        let folder = '';
        if (scorePercentage <= 20) {
            folder = 'v_rest';
        } else if (scorePercentage <= 40) {
            folder = 'v_5';
        } else if (scorePercentage <= 60) {
            folder = 'v_6_7';
        } else if (scorePercentage <= 80) {
            folder = 'v_8_9';
        } else {
            folder = 'v_10';
        }
        const randomImage = Math.floor(Math.random() * 5) + 1;
        const path = `/resources/${folder}/${randomImage}.png`;
        setScoreImage(path);
        setImagePath(path);
    }

    const navigateHome = () => {
        navigate('/materie', { state: { selectedMaterie: materie } });
    }

    const getQuestionStatus = (questionIndex) => {
        const userAnswer = userAnswers.find(answer => answer.qnIndex === questions[questionIndex].qnId);
        const correctAnswer = correctAnswers.find(answer => answer.qnId === questions[questionIndex].qnId);
        if (userAnswer && correctAnswer) {
            if (userAnswer.selectedOption === correctAnswer.answer) {
                return 'correct';
            } else {
                return 'incorrect';
            }
        }
        return '';
    };

    return (
        <div className='container_rez'>
            {scoreImage && <img src={scoreImage} alt="Score based result" className='score_image' />}
            <div className='result_rez'>Scorul tău este: {result}/{correctAnswers.length}</div>
            <br />
            {result === correctAnswers.length && (
                <div>Ai raspuns corect la toate intrebarile. Ai trecut la nivelul urmator!</div>
            )}
            <h2 className='h2_rez'>Rezultatele tale</h2>
            {questions.map((question, index) => (
                <div key={index} className={`question ${getQuestionStatus(index)}`}>
                    <p className='p_rez'>{question.questionAsked}</p>
                    <ul className='answer-options'>
                        {question.options.map((option, optionIndex) => {
                            const userAnswer = userAnswers.find(answer => answer.qnIndex === question.qnId);
                            const correctAnswer = correctAnswers.find(answer => answer.qnId === question.qnId);
                            const isSelected = userAnswer && userAnswer.selectedOption === (optionIndex + 1);
                            const isCorrect = correctAnswer && correctAnswer.answer === (optionIndex + 1);
                            return (
                                <li key={optionIndex} className={`answer-option ${isCorrect ? 'correct-option' : ''} ${isSelected && !isCorrect ? 'incorrect-option' : ''}`}>
                                    {option}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
            <button className='button_rez' onClick={navigateHome}>Pagina Home</button>
        </div>
    );
};

export default Rezultat;
