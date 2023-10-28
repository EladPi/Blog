import { Link, useLocation, useParams } from 'react-router-dom';
import { selectAllForums } from '../../slices/forumsSlice';
import { selectSubjectsForForum } from '../../slices/forumsSlice';
import { selectPostById } from '../../slices/postsSlice';
import { useSelector } from 'react-redux';



function ProgressBar() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const { forumId, subjectId, postId } = useParams();

    const actualForumId = forumId || '';
    const actualSubjectId = subjectId || '';
    const actualPostId = postId || '';

    const allForums = useSelector(selectAllForums);
    const subjectForForum = useSelector(state => selectSubjectsForForum(state, forumId));
    const postById = useSelector(state => selectPostById(state, postId));

    const routes = {
        '/': 'Home',
        [actualForumId]: allForums[actualForumId] ? allForums[actualForumId].name : undefined,
        [actualSubjectId]: subjectForForum ? subjectForForum.name : undefined,
        [actualPostId]: postById ? postById.title : undefined,
    };
    
    return (
        <div className="breadcrumb">
            <Link to="/">Home</Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                    <span key={name}>
                        {' > '}
                        <Link to={routeTo}>{routes[routeTo] || name}</Link>
                    </span>
                );
            })}
        </div>
    );
}

export default ProgressBar;
