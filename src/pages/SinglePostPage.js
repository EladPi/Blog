import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../slices/postsSlice";
import Comments from "../components/PostsComponents/Comments";
import RemovePost from "../components/UI/RemovePost";
import EditPost from "../components/UI/EditPost";
import { selectCurrentUser } from "../slices/userSlice";
import '../styles/SinglePostPage.css'



const SinglePostPage = () => {
    const { postId } = useParams();
    const postById = useSelector(state => selectPostById(state, postId)) // checks if the post exist in the database.
    const currentUser = useSelector(selectCurrentUser);

    return (

        <>
            {postById == undefined ? <div className="singlepostpage-postnotfound-div">Error 404 . <br /> Post not found.</div>
                :
                <>
                    <div className="post-div">
                        <div className="post-author-buttons-div">
                            <div className="singlepostpage-post-details">{postById.author} : {postById.title}</div>
                            {currentUser === postById.author ?
                                <div className="singlepostpage-buttons-div">
                                    <RemovePost />
                                    <EditPost />
                                </div>
                                :
                                <></>}
                        </div>
                        <div className="singlepostpage-post-description">{postById.content}</div>
                    </div>

                    <Comments postId={postId} />
                </>
            }
        </>
    )
}


export default SinglePostPage;