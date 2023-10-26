
import SearchBar from "./UI/Search";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { selectCurrentUser, logout } from "../slices/userSlice";
import '../styles/Layout.css'
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "./UI/ProgressBar";



export default function Layout({ children }) {
    const loggedUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    return (
        <>
            <header className="blog-title-header">
                <Link to={'/'}> <h1 className="blog-title">My Blog</h1> </Link>
            </header>
            <div className="bottom-bar">
                <SearchBar />
                {loggedUser ?
                    <div className="username-and-logout-div">
                        <p>Welcome, {loggedUser}!</p>
                        <button onClick={() => dispatch(logout())}>Logout</button>
                        <Link to='/favorites'><button id="layout-fav-button">Favorites</button></Link>
                    </div>
                    :
                    <div className="auth-buttons">
                        <Link to="/register" className="auth-button">Register</Link>
                        <Link to="/login" className="auth-button">LogIn</Link>
                    </div>
                }
            </div>
            <div className="progression-bar">
                <ProgressBar />
            </div>
            {children}
            <Outlet />
        </>
    )
}