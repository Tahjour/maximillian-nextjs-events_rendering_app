import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
    const { eventId } = props;
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const notificationCtx = useContext(NotificationContext);

    useEffect(() => {
        if (showComments) {
            setIsLoadingComments(true);
            fetch(`/api/comments/${eventId}`).then(res => res.json()).then(data => {
                setComments(data.comments);
                setIsLoadingComments(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showComments, eventId]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addComment(commentData) {
        // send data to API
        notificationCtx.showNotification({
            title: "Adding comment...",
            message: "Your comment is being added.",
            status: "pending"
        });
        fetch(`/api/comments/${eventId}`, {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.ok) {
                return res.json();
            }
            const data = await res.json();
            throw new Error(data.message || "Something went wrong");
        }).then(data => {
            console.log(data);
            notificationCtx.showNotification({
                title: "Success",
                message: "Your comment was added!",
                status: "success"
            });
        }).catch(err => {
            notificationCtx.showNotification({
                title: "Error!",
                message: err.message || 'Something went wrong!',
                status: "error"
            });
        });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment addComment={addComment} />}
            {showComments && !isLoadingComments && <CommentList comments={comments} />}
            {showComments && isLoadingComments && <p>Loading...</p>}
        </section>
    );
}

export default Comments;
