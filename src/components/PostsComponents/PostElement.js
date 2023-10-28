import { Link } from 'react-router-dom';
import '../../styles/PostElement.css';
import Favorite from '../UI/Favorite';


const PostElement = ({ post }) => {
  //sliced content.
  const truncatedContent = post.content.slice(0, 50) + (post.content.length > 50 ? "..." : "");

  return (
    <Link to={post.id}  className='post-element-link'>
      <li className='post-element-li'>
        <div className='post-element-author-favorite-div'>
          <p className='post-element-author'>By: {post.author}</p>
          <Favorite postId={post.id} />
        </div>
        <div className='post-element-title-content-div'>
          <p className='post-element-title'>{post.title}</p>
          <p className='post-element-content'>{truncatedContent}</p>
        </div>
      </li>
    </Link>
  );
};

export default PostElement;
