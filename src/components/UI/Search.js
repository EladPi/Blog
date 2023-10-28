import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/search.css'
import { Link } from 'react-router-dom';
import { selectPostsForSearchByTitle, selectPostsForSearchByContent } from '../../slices/postsSlice';
import { updateQuery } from '../../slices/searchSlice';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const postsForSearchByTitle = useSelector(state => selectPostsForSearchByTitle(state, searchQuery));
    const postsForSearchByContent = useSelector(state => selectPostsForSearchByContent(state, searchQuery));
    const dispatch = useDispatch();
    
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        dispatch(updateQuery(e.target.value))
    }

    const handleLinkClick = () =>{
        setSearchQuery('');
    }


    return (
        <>
            <div className="search-container">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search for a post"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                
                {searchQuery != '' ?
                    <div className='search-bar-results-div'>
                        <ul>
                            {postsForSearchByTitle.map(post => (
                                <Link to={`/search/${post.id}`} className='search-link' onClick={handleLinkClick}>
                                    <li key={post.id} className='searchresults-li'>
                                        <p className='search-post-title'>{post.title}</p>
                                        <p className='search-post-content'>{post.content.slice(0, 30) + (post.content.length > 30 ? "..." : "")}</p>
                                    </li>
                                </Link>
                            ))}
                            {postsForSearchByContent.map(post => (
                                <Link to={`/search/${post.id}`} className='search-link' onClick={handleLinkClick}>
                                    <li key={post.id} className='searchresults-li'>
                                        <p className='search-post-title'>{post.title}</p>
                                        <p className='search-post-content'>{post.content}</p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    :
                    <></>}
            </div>
        </>
    )
}


