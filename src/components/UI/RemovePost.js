// Remove button in the the post structure. 
// The user will only be able to delete if the 
// author is similar to the username.

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../slices/userSlice";
import { deletePost, selectAllPosts } from "../../slices/postsSlice";
import { removePostFromSubject } from "../../slices/subjectsSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


import '../../styles/RemovePost.css';

const RemovePost = () => {
    const { postId, subjectId, forumId } = useParams();
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);
    const allPosts = useSelector(selectAllPosts);

    const handleDeleteClick = () => {
        setShowMessage(true);
    }

    const handleYesClick = () => {
        setHasClicked(true);
        dispatch(removePostFromSubject({subjectId , postId}))
        //dispatch(deletePost({ id: postId }));
        setTimeout(() => {
            navigate(`/${forumId}/subjects/${subjectId}/posts`);
            setShowMessage(false);
        }, 3000)
    }

    const handleNoClick = () => {
        setShowMessage(false);
        setHasClicked(false);
    }

    return (
        <>
            <button className="delete-and-edit-button" onClick={handleDeleteClick} >Delete</button>
            {showMessage ?
                <div className="delete-post-message-wholescreen-div">
                    <div className="delete-post-message-div">
                        {hasClicked ? <span>Your post has been deleted successfully.<br /></span> : <span>THERE IS NO GOING BACK! <br /></span>}
                        {hasClicked ? <p>You will be directed to the subjects page.</p> : <p>Are you sure you want to delete your post?</p>}
                        {hasClicked ?
                            <></>
                            :
                            <div className="delete-post-message-buttons">
                                <button onClick={handleYesClick} >Yes</button>
                                <button onClick={handleNoClick} >No</button>
                            </div>}
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}

export default RemovePost;