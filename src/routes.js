import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import PostsPage from './pages/PostsPage';
import SinglePostPage from './pages/SinglePostPage';
import RegisterAndLogin from './pages/RegisterAndLogin';
import FavoritesPage from './pages/FavoritesPage';
import NewPostPage from './pages/NewPostPage';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage />} />
                    <Route path='favorites' element={<FavoritesPage />}/>
                    <Route path="favorites/:postId" element={<SinglePostPage />} />
                    <Route path=":forumId" element={<SubjectsPage />} />
                    <Route path=":forumId/:subjectId" element={<PostsPage />} />
                    <Route path=':forumId/:subjectId/newpost' element={<NewPostPage />} />
                    <Route path=":forumId/:subjectId/:postId" element={<SinglePostPage />} />
                    <Route path="/search/:postId" element={<SinglePostPage />} />
                </Route>
                <Route path='/register' element={<RegisterAndLogin actionType='register' />}/>
                <Route path='/login' element={<RegisterAndLogin actionType='login' />}/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
