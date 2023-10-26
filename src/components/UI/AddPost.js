// Add button that will add a post.


import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddPost = () =>{
    const {subjectId, forumId} = useParams();
    
    return(
        <>
        <Link to={`/${forumId}/${subjectId}/newpost `}>
            <button className="addpost-button">
                New Post
            </button>
        </Link>
        </>
    )
}

export default AddPost ; 