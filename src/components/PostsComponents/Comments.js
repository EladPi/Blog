
import { selectCommentsForPost, addComment, deleteComment } from "../../slices/commentsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { selectCurrentUser, selectIsAuthenticated } from '../../slices/userSlice';
import { selectAllPosts } from "../../slices/postsSlice";
import { v4 as uuidv4 } from "uuid";

import '../../styles/Comments.css'

const Comments = ({ postId }) => {
    const comments = useSelector(state => selectCommentsForPost(state, postId));
    const dispatch = useDispatch();
    const [commentValue, setCommentValue] = useState('');
    const currentUser = useSelector(selectCurrentUser);
    const isLogged = useSelector(selectIsAuthenticated);
    const allPosts = useSelector(selectAllPosts);

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (commentValue.trim() === '') return; // Don't allow empty comments

        dispatch(addComment({
            postId: postId,
            authorName: currentUser,
            commentId: uuidv4(),
            content: commentValue
        }));

        setCommentValue(''); // Clear the textarea after submitting
    }


    const handleDeleteComment = (authorName, commentId) => {
        if (authorName != currentUser) {
            return;
        }
        dispatch(deleteComment({ postId, authorName, commentId }));
    };

    return (
        <>
            <div className="comments-comments-div">
                <p className='comments-comments-length'>Comments: {comments.length}</p>
                {/* Below is a logic that prints a sentence if there are not comments*/}
                {comments.length != 0 ?
                    comments.map(comment => {
                        return (
                            <>
                                <div className="comments-single-comment-div">
                                    <div className='comments-comment-authornbuttons-div'>
                                        <p className="comments-comment-author">By {comment.authorName}</p>
                                        <div className='comments-button-div'>
                                            {comment.authorName === currentUser ?
                                                <>
                                                    <button className='comments-delete-comment' onClick={() => handleDeleteComment(comment.authorName, comment.commentId)}>
                                                        Delete
                                                    </button>
                                                </>
                                                :
                                                <></>
                                            }
                                        </div>
                                    </div>
                                    <p className="comments-comment-content">{comment.content}</p>
                                </div>
                            </>
                        )
                    })
                    :
                    <p>There are not any comments to this post yet.</p>}
            </div>

            {isLogged ?
                <div className='comments-form-div'>
                    <form className="comments-comment-form" onSubmit={handleCommentSubmit}>
                        <label htmlFor="newComment">New Comment:</label>
                        <textarea
                            id="newComment"
                            name="comment"
                            rows="4"
                            cols="50"
                            value={commentValue}
                            onChange={e => setCommentValue(e.target.value)}
                        ></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                :
                <div className='comments-form-div'>
                    <form className="comments-comment-form" onSubmit={handleCommentSubmit}>
                        <label htmlFor="newComment">New Comment:</label>
                        <textarea
                            disabled
                            placeholder="You must be logged in to post a comment."
                            id="newComment"
                            name="comment"
                            rows="4"
                            cols="50"
                            value={commentValue}
                            onChange={e => setCommentValue(e.target.value)}
                        ></textarea>
                        <button disabled className="disabeled-submit-button" type="submit">Submit</button>
                    </form>
                </div>
            }

        </>

    )
}


export default Comments;