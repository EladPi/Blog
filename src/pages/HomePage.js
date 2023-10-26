// The forums page.
import FullList from "../components/PostsComponents/FullList";
import { selectAllForums } from "../slices/forumsSlice";
import { useSelector } from "react-redux";

function HomePage () {
    const allForums = useSelector (selectAllForums);

    return(
        <FullList items= {allForums} type='Forums'>

        </FullList>
    )
}


export default HomePage;