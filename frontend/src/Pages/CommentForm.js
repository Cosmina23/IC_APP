import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/CommentsForm.css';

const CommentForm = ({ onCommentAdded, replyTo, clearReply }) => {
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [parentCommentID, setParentCommentID] = useState(null);
    const [replyToEmail, setReplyToEmail] = useState('');


    useEffect(() => {
        const userEmailFromLocalStorage = localStorage.getItem('userEmail');
        console.log("User Email from LocalStorage:", userEmailFromLocalStorage); // Debugging
        setEmail(userEmailFromLocalStorage || '');
    
        if (replyTo) {
            setParentCommentID(replyTo.commentID);
            setReplyToEmail(replyTo.userEmail); // Setează email-ul persoanei la care răspunzi
        } else {
            setParentCommentID(null);
            setReplyToEmail(''); // Golește email-ul persoanei la care răspunzi
        }
    }, [replyTo]);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newComment = {
            userEmail: email,
            content: content,
            parentCommentID: parentCommentID
        };
        try {
            await axios.post('http://localhost:5269/api/comments', newComment);
            onCommentAdded();
            setContent('');  // Curăță doar conținutul comentariului
            clearReply();
        } catch (error) {
            console.error('There was an error adding the comment!', error);
        }
    };

    return (
        <div className="comment-form-container">
            <form onSubmit={handleSubmit} className="comment-form">
                {replyTo && (
                    <p className="p_raspuns">Răspuns pentru:{replyToEmail}</p>
                )}
                <div className="form-row">
                    <textarea
                        aria-label='Comentariu'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Adauga</button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;
