import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import axios from 'axios';
import '../Css/CommentsPage.css';
import { useNavigate } from 'react-router-dom';

const CommentsPage = () => {
    const [refreshComments, setRefreshComments] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleCommentAdded = () => {
        setRefreshComments(!refreshComments);
    };

    const handleReply = (comment) => {
        setReplyTo(comment);
    };

    const clearReply = () => {
        setReplyTo(null);
    };

    const handleCommentDeleted = () => {
        setRefreshComments(!refreshComments);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5269/api/Logout', null, {
                withCredentials: true // pentru cookies
            });
            navigate('/'); // Redirecționează către pagina de autentificare sau altă pagină dorită
        } catch (error) {
            console.error('Eroare la deconectare:', error);
        }
    };

    return (
        <div className="comments-page">
            <div className="navbar_h_com">
                <button className="menu-buttonH" onClick={toggleMenu}>Meniu</button>
                {menuOpen && (
                    <div className="dropdown-menuH_com">
                        <button className="buttonH" type='button' onClick={() => navigate('/profile')}>Profil</button>
                        <button className="buttonH" type='button' onClick={() => navigate('/homeMaterie')}>Materii</button>
                        <button className="buttonH" type='button' onClick={handleLogout}>Deconectare</button>
                    </div>
                )}
            </div>
            <div className="comments-container">
                <CommentsList 
                    key={refreshComments} 
                    onReply={handleReply} 
                    currentReply={replyTo} 
                    onDelete={handleCommentDeleted} 
                />
            </div>
            <div className="comment-form-container">
                <CommentForm onCommentAdded={handleCommentAdded} replyTo={replyTo} clearReply={clearReply} />
            </div>
        </div>
    );
};

export default CommentsPage;
