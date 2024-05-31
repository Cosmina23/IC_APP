import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/CommentsList.css';

const CommentsList = ({ onReply, currentReply }) => {
    const [comments, setComments] = useState([]);
    const [highlightedComment, setHighlightedComment] = useState(null);
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:5269/api/comments');
            console.log("Response data:", response.data);
            setComments(response.data);
        } catch (error) {
            console.error('There was an error fetching the comments!', error);
        }
    };

    const handleDelete = async (commentID) => {
        try {
            await axios.delete(`http://localhost:5269/api/comments/${commentID}`);
            setComments(comments.filter(comment => comment.commentID !== commentID)); // Update state without refresh
        } catch (error) {
            console.error('There was an error deleting the comment!', error);
        }
    };

    const handleReply = (comment) => {
        if (currentReply && currentReply.commentID === comment.commentID) {
            onReply(null);
        } else {
            onReply(comment);
        }
    };

    const findParentEmail = (parentCommentID) => {
        const parentComment = comments.find(comment => comment.commentID === parentCommentID);
        return parentComment ? parentComment.userEmail : null;
    };

    const scrollToComment = (commentID) => {
        const element = document.getElementById(`comment-${commentID}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setHighlightedComment(commentID);
            setTimeout(() => {
                setHighlightedComment(null);
            }, 3000); // Elimina evidențierea după 3 secunde
        }
    };

    return (
        <div className="comments-list">
            <ul>
                {comments.map((comment) => (
                    <li 
                        key={comment.commentID} 
                        id={`comment-${comment.commentID}`}
                        className={`comment-item ${comment.userEmail === userEmail ? 'comment-right' : 'comment-left'} ${highlightedComment === comment.commentID ? 'highlight' : ''}`}
                    >
                        <div className="comment-header">
                            {comment.parentCommentID && (
                                <span className="parent-email">
                                    Răspuns la: <button onClick={() => scrollToComment(comment.parentCommentID)}>
                                        {findParentEmail(comment.parentCommentID)}
                                    </button>
                                </span>
                            )}
                            <span className="comment-email">{comment.userEmail}:</span>
                            <span className="comment-content">{comment.content}</span>
                        </div>
                        <div className="comment-footer">
                            <small>{new Date(comment.createdAt).toLocaleString()}</small>
                        </div>
                        <div className="comment-buttons">
                            <button className="button-comlist" onClick={() => handleReply(comment)}>
                                {currentReply && currentReply.commentID === comment.commentID ? 'Anulează' : 'Răspunde'}
                            </button>
                            {comment.userEmail === userEmail && (
                                <button className="button-comlist" onClick={() => handleDelete(comment.commentID)}>Șterge</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsList;
