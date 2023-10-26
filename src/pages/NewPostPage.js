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
    const allSubjects = useSelector(selectAllSubjects);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {forumId , subjectId} =useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPostId = `post${allPosts.length +1}`;

        if(title.length <= 3){
            alert('Your title is too short.')
        }
        else if(content.length <= 5){
            alert('Your content is too short.')
        }
        else{
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

            console.log(allSubjects)
    
            setTitle('');
            setContent('');
            alert('Post succesfully submitted!');
            navigate(`/${forumId}/${subjectId}/${newPostId}`)
        }
    };

    console.log(allPosts);
    
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
                <div>
                    <label htmlFor="postContent">Post Content:</label>
                    <textarea 
                        id="postContent" 
                        value={content} 
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">Add a Post</button>
            </form>
            }
        </>
    )
}

export default NewPostPage;
