import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostsList from '../components/PostsComponents/PostsList';
import { selectAllPosts } from '../slices/postsSlice';
import { selectAllSubjects } from '../slices/subjectsSlice';
import AddPost from '../components/UI/AddPost';
import { selectCurrentUser } from '../slices/userSlice';

const PostsPage = () => {
  const { subjectId } = useParams();
  const allSubjects = useSelector(selectAllSubjects);
  const allPosts = useSelector(selectAllPosts);
  const currentUser = useSelector(selectCurrentUser);

  // Find the relevant subject based on the subjectId from URL params
  const currentSubject = allSubjects.find(subject => subject.id === subjectId);
  // Find relevant posts
  const postsForSubject = currentSubject?.posts?.map(postId => allPosts.find(post => post.id === postId)) || [];


  return (
    <>
    <div className='posts-page-div'>
      <h2 className='posts-page-name'>{currentSubject?.name}</h2>
      <div>
        <p className='posts-page-description'>{currentSubject?.description}</p>
        <div>
          {currentUser ? <AddPost /> : <></>}
        </div>
      </div>
      <PostsList posts={postsForSubject} />
      </div>
    </>
  );
};

export default PostsPage;
