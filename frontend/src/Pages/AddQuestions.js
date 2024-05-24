import React, { useState } from 'react';

const AddQuestions = () => {
  
    const [questionAsked, setQuestionAsked] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [answer, setAnswer] = useState('');
    const [level, setLevel] = useState(0);
    const [course, setCourse] = useState(0); 

    const handleSubmit = async(e) => {
        e.preventDefault();//pentru a opri functia implicita de refresh a form=ului
  
        try {
          await fetch(' http://localhost:5269/addQuestion', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
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
  
        } catch (error) {
          console.error('Eroare la trimiterea cererii către server:', error);
          // Daca apare o eroare
      }
    };
    

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="questionAsked">Intrebarea</label>
          <input
            type="text"
            className="form-control"
            onChange={e => setQuestionAsked(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="option1">Optiunea 1</label>
          <input
            type="text"
            className="form-control"
            onChange={e => setOption1(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="option2">Optiunea 2</label>
          <input
            type="text"
            className="form-control"
            onChange={e => setOption2(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="option3">Optiunea 3</label>
          <input
            type="text"
            className="form-control"
            onChange={e => setOption3(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="answer">Raspuns</label>
          <input
            type="number"
            className="form-control"
            onChange={e => setAnswer(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="level">Nivelul</label>
          <input
            type="number"
            className="form-control"
            id="level"
            name="level"
            onChange={e => setLevel(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select
            className="form-control"
            onChange={e => setCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            <option value="Romana">Romana</option>
            <option value="Istorie">Istorie</option>
            <option value="Biologie">Biologie</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuestions;
