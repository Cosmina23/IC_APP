import React, { useState } from 'react';
import axios from 'axios';
import '../Css/AddChallenge.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddChallenge = () => {

    const [course, setCourse] = useState('');
    const [question, setQuestion] = useState('');
    const [valoare, setValoare] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [answer, setAnswer] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5269/addChallenge', {
                course,
                question,
                option1,
                option2,
                option3,
                answer: parseInt(answer, 10),
                valoare: parseInt(valoare, 10),
                date
            });

            setCourse('');
            setQuestion('');
            setOption1('');
            setOption2('');
            setOption3('');
            setAnswer('');
            setDate('');
            setValoare('')

            toast.success('Challenge adăugat cu succes!');
        } catch (error) {
            console.log("Eroare adaugare challenge")
        }
    };

    return (
        <div>
            <h2 className='h2-adaugare'>Adaugă challenge zilnic</h2>
            <div className="form-container">
                <form className='formular-adaugare' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='label-adaugare' htmlFor="course">Materie</label>
                    <select
                    className="form-control"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    required
                    >
                    <option value="">Selectează o materie</option>
                    <option value="Romana">Română</option>
                    <option value="Istorie">Istorie</option>
                    <option value="Biologie">Biologie</option>
                    </select>
                </div>
                    <div className="form-group">
                        <label className='label-adaugare' htmlFor="question">Întrebarea</label>
                        <input
                            type="text"
                            className="form-control"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='label-adaugare' htmlFor="valoare">Puncte întrebare</label>
                        <input
                            type="number"
                            className="form-control"
                            value={valoare}
                            onChange={(e) => setValoare(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='label-adaugare' htmlFor="option1">Opțiunea 1</label>
                        <input
                            type="text"
                            className="form-control"
                            value={option1}
                            onChange={(e) => setOption1(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='label-adaugare' htmlFor="option2">Opțiunea 2</label>
                        <input
                            type="text"
                            className="form-control"
                            value={option2}
                            onChange={(e) => setOption2(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='label-adaugare' htmlFor="option3">Opțiunea 3</label>
                        <input
                            type="text"
                            className="form-control"
                            value={option3}
                            onChange={(e) => setOption3(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='label-adaugare' htmlFor="answer">Răspuns</label>
                        <input
                            type="number"
                            className="form-control"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='label-adaugare' htmlFor="date">Data</label>
                        <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className='button-container'>
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddChallenge