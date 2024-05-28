import React, { useState } from 'react';
import '../Css/AddChallenge.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuestions = () => {

  const [questionAsked, setQuestionAsked] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [answer, setAnswer] = useState('');
  const [level, setLevel] = useState(0);
  const [course, setCourse] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();//pentru a opri functia implicita de refresh a formului

    try {
      await fetch(' http://localhost:5269/addQuestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionAsked,
          option1,
          option2,
          option3,
          answer: parseInt(answer, 10),
          level: parseInt(level, 10),
          course
        })
      });
      setQuestionAsked('');
      setOption1('');
      setOption2('');
      setOption3('');
      setAnswer('');
      setCourse('');
      setLevel('');

      toast.success('Întrebarea a fost adăugată cu succes!');

    } catch (error) {
      console.error('Eroare la trimiterea cererii către server:', error);
      // Daca apare o eroare
    }
  };


  return (
    <div>
      <h2 className='h2-adaugare'>Adaugă întrebare</h2>
      <div className="form-container">
        <form className='formular-adaugare' onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='label-adaugare' htmlFor="questionAsked">Întrebarea</label>
            <input
              type="text"
              className="form-control"
              value={questionAsked}
              onChange={e => setQuestionAsked(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className='label-adaugare' htmlFor="option1">Opțiunea 1</label>
            <input
              type="text"
              className="form-control"
              value={option1}
              onChange={e => setOption1(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className='label-adaugare' htmlFor="option2">Opțiunea 2</label>
            <input
              type="text"
              className="form-control"
              value={option2}
              onChange={e => setOption2(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className='label-adaugare' htmlFor="option3">Opțiunea 3</label>
            <input
              type="text"
              className="form-control"
              value={option3}
              onChange={e => setOption3(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className='label-adaugare' htmlFor="answer">Răspuns</label>
            <input
              type="number"
              className="form-control"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className='label-adaugare' htmlFor="level">Nivelul</label>
            <input
              type="number"
              className="form-control"
              value={level}
              onChange={e => setLevel(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className='label-adaugare' htmlFor="course">Course</label>
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

          <div className='button-container'>
            <button type="submit" className="btn">Submit</button>
          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddQuestions;
