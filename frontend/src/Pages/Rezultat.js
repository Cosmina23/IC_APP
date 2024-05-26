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
        navigate('/homeMaterie');
    }

    return (
        <div className='container_rez'>
            <h2 className='h2_rez'>Rezultate user</h2>
            <ul className='ul_rez'>
                {userAnswers.map((answer, index) => (
                    <li className='li_rez' key={index}>{`Intrebarea ${index + 1}: Raspunsul cu id ${answer.qnIndex} este ${answer.selectedOption}`}</li>
                ))}
            </ul>

            <h2>Rezultate corecte</h2>
            <ul>
                {correctAnswers.map((answer, index) => (
                    <li className='li_rez' key={index}>{`Intrebarea ${index + 1}: Raspunsul cu id ${answer.qnId} este ${answer.answer}`}</li>
                ))}
            </ul>

            <div>Raspunsuri corecte: {result}</div>
            {scoreImage && <img src={scoreImage} alt="Score based result" className='score_image' />}
            <div className='result_rez'>Scorul tău este: {result}/{correctAnswers.length}</div>

            {imagePath && <div>Path of selected image: {imagePath}</div>}
            <br></br>
            {result === correctAnswers.length && ( // Afisează butonul Next doar dacă mai există întrebări
                <div>Ai raspuns corect la toate intrebarile. Ai trecut la nivelul urmator!</div>
            )}
            <button className='button_rez' onClick={navigateHome}>Pagina Home</button>
        </div>
    );
};

export default Rezultat;
