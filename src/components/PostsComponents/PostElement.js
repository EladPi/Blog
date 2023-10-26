import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PostElement.css';
import Favorite from '../UI/Favorite';


const PostElement = ({ post }) => {
  return (
    <Link to={post.id}  className='post-element-link'>
      <li className='post-element-li'>
        <div className='post-element-author-favorite-div'>
          <p className='post-element-author'>By: {post.author}</p>
          <Favorite postId={post.id} />
        </div>
        <div className='post-element-title-content-div'>
          <p className='post-element-title'>{post.title}</p>
          <p className='post-element-content'>{post.content}</p>
        </div>
      </li>
    </Link>
  );
};

export default PostElement;
