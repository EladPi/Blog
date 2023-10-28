import { selectPostsForSearchByContent, selectPostsForSearchByTitle } from "../slices/postsSlice";
import { selectSearchQuery } from "../slices/searchSlice";
import { useSelector } from "react-redux";
import PostsList from "../components/PostsComponents/PostsList";
import '../styles/search.css';

const SearchPage = () =>{
    const searchQuery = useSelector(selectSearchQuery);
    const postsForSearchByTitle = useSelector(state => selectPostsForSearchByTitle(state, searchQuery));
    const postsForSearchByContent = useSelector(state => selectPostsForSearchByContent(state, searchQuery));

    return(
        <>
        <div className="searchpage-div">
            <h2 className="searchpage-span">Search Results</h2>
            <PostsList posts={[...postsForSearchByTitle, ...postsForSearchByContent]} />
        </div>
        </>
    )
}


export default SearchPage;