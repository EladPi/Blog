import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, selectPostById } from "../../slices/postsSlice";
import { useState } from "react";
import '../../styles/EditPost.css'


const EditPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const postById = useSelector(state => selectPostById(state, postId))

    const [showMessage, setShowMessage] = useState(false);
    const [newTitle, setNewTitle] = useState(postById.title);
    const [newContent, setNewContent] = useState(postById.content);


    //Error handeling in input.
    const [titleTooShort, setTitleTooShort] = useState(false);
    const [contentTooShort, setContentTooShort] = useState(false);


    const handleClickButton = () => {
        setShowMessage((showMessage) => !showMessage);
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (newTitle.length < 3) {
            setTitleTooShort(true);

        }

        if (newContent.length < 5) {
            setContentTooShort(true);
        }

        else if (newTitle.length > 3 && newContent.length > 5) {
            dispatch(updatePost({
                id: postId,
                title: newTitle,
                content: newContent
            }));
            setTitleTooShort(false);
            setContentTooShort(false);
            setShowMessage(false)
        }
    }


    return (
        <>

            <button className="delete-and-edit-button" onClick={handleClickButton}>
                Edit
            </button>

            {showMessage ?
                <div className="editpost-outer-div">
                    <div className="editpost-inner-div">
                        <form className='editpost-form' onSubmit={handleSubmit}>
                            <div className="editpost-posttitle-div">
                                <label htmlFor="editPostTitle">Post Title:</label>
                                <input
                                    type="text"
                                    id="editPostTitle"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                />
                                {titleTooShort ? <span>Title must contain more than 3 letters.</span> : <></>}
                            </div>
                            <div className="editpost-postcontent-div">
                                <label htmlFor="editPostContent">Post Content:</label>
                                <br />
                                <textarea
                                    id="editPostContent"
                                    value={newContent}
                                    onChange={e => setNewContent(e.target.value)}
                                />
                                {contentTooShort ? <span className='newpostpage-contenttooshort'>Content must contain more than 5 letters.</span> : <></>}

                            </div>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
                :
                <></>
            }

        </>
    )
}

export default EditPost; 