import PostElement from './PostElement';
import '../../styles/PostsList.css';

const PostsList = ({ posts }) => {
    return (
      <ul className='posts-list-ul'>
        {posts.map(post => (
          <PostElement key={post.id} post={post} />
        ))}
      </ul>
    );
  };

export default PostsList;
