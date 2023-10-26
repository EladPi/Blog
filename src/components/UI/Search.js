import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/search.css'
import { Link } from 'react-router-dom';
import { selectPostsForSearchByTitle, selectPostsForSearchByContent } from '../../slices/postsSlice';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const postsForSearchByTitle = useSelector(state => selectPostsForSearchByTitle(state, searchQuery));
    const postsForSearchByContent = useSelector(state => selectPostsForSearchByContent(state, searchQuery));

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        console.log(postsForSearchByTitle)
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
                    value={searchQuery}  // Bind the input's value to the searchQuery state
                    onChange={handleInputChange}  // Attach the event handler
                />
                
                {searchQuery != '' ?
                    <div className='search-bar-results-div'>
                        <ul>
                            {postsForSearchByTitle.map(post => (
                                <Link to={`/search/${post.id}`} className='search-link' onClick={handleLinkClick}>
                                    <li key={post.id} className='searchresults-li'>
                                        <p className='search-post-title'>{post.title}</p>
                                        <p className='search-post-content'>{post.content}</p>
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
