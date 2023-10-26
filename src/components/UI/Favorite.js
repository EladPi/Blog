// Favorite button in the single post .

import '../../styles/Favorite.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isPostFavorite, addFavorite, removeFavorite } from '../../slices/favoritesSlice';
import { selectCurrentUser } from '../../slices/userSlice';

const Favorite = ({ postId }) => {

    const src1 = '/assents/heart-regular.svg';
    const src2 = '/assents/heart-solid.svg';

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const postIsFavorite = useSelector(state => isPostFavorite(state, currentUser, postId));


    const [imgSrc, setImgSrc] = useState(postIsFavorite ? src2 : src1);

    const handleClick = (event) => {
        event.preventDefault();

        if (!postIsFavorite) {
            dispatch(addFavorite({ userId: currentUser, postId: postId }));
            setImgSrc(src2);
        }
        else {
            dispatch(removeFavorite({ userId: currentUser, postId: postId }));
            setImgSrc(src1);
        }
    };

    return (
        <>
            <div className='favorite-button-div'>
                {currentUser ?
                    <button className="favorite-button" onClick={handleClick}>
                        <img src={imgSrc}></img>
                    </button>
                    :
                    <></>}
            </div>
        </>
    )
}

export default Favorite; 