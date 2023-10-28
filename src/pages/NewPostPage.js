import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectCurrentUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import { addPost, selectAllPosts } from '../slices/postsSlice';
import '../styles/NewPostPage.css'
import { useParams } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import { addPostToSubject } from '../slices/subjectsSlice';
import { selectAllSubjects } from '../slices/subjectsSlice';

const NewPostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const currentUser = useSelector(selectCurrentUser);
    const allPosts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {forumId , subjectId} =useParams();


    // error handeling on inputs.
    const [titleTooShort, setTitleTooShort] = useState(false);
    const [contentTooShort , setContentTooShort] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const newPostId = `post${allPosts.length +1}`;

        if(title.length <= 3){
            setTitleTooShort(true);
            return;
        }

        if(content.length <= 5){
            setContentTooShort(true);
            return;
        }
        else{
            setTitleTooShort(false);
            setContentTooShort(false);
            dispatch(addPostToSubject({
                subjectId,
                postId: newPostId
            }));
            
            dispatch(addPost({
                id: newPostId,
                title,
                content,
                author:currentUser
            }));

    
            setTitle('');
            setContent('');
            alert('Post succesfully submitted!');
            navigate(`/${forumId}/${subjectId}/${newPostId}`)
        }
    };

    
    return (
        <>
            {currentUser === undefined ?
                <p>You are not logged in.</p>
            :
            <form className='newpostpage-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="postTitle">Post Title:</label>
                    <input 
                        type="text" 
                        id="postTitle" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                {titleTooShort ? <span>Title must contain more than 3 letters.</span> : <></>}
                <div>
                    <label htmlFor="postContent">Post Content:</label>
                    <textarea 
                        id="postContent" 
                        value={content} 
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                {contentTooShort ? <span className='newpostpage-contenttooshort'>Content must contain more than 5 letters.</span> : <></>}
                <button type="submit">Add a Post</button>
            </form>
            }
        </>
    )
}

export default NewPostPage;
