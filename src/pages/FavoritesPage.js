

import { useSelector } from 'react-redux';
import { selectFavoritePosts } from '../slices/favoritesSlice';
import { selectCurrentUser } from '../slices/userSlice';
import PostsList from '../components/PostsComponents/PostsList';
import '../styles/FavoritesPage.css';

const FavoritesPage = () =>{
    const currentUser = useSelector(selectCurrentUser);
    const favoritePosts = useSelector(state => selectFavoritePosts(state , currentUser));

    console.log(favoritePosts);
    return(
        <>  
        <div className='favorite-posts-div'>
            {favoritePosts.length === 0 ?
             <p>Your favorite list is currently empty. <br/> Explore the website and add some favorite posts!</p>
             :
             <PostsList posts={favoritePosts} />
             }
        </div>
        </>
    )
}


export default FavoritesPage;