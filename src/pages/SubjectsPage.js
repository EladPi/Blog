// The Subjects page.

import { selectAllSubjects } from "../slices/subjectsSlice";
import FullList from "../components/PostsComponents/FullList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SubjectsPage () {
    const allSubjects = useSelector (selectAllSubjects)
    const {forumId} = useParams();
    

    const subjectsForForum = allSubjects.filter(subject => subject && subject.forumId === forumId);

    return(
        <>
        <FullList items= {subjectsForForum} type='Subjects'></FullList>
        </>
    )
}


export default SubjectsPage;