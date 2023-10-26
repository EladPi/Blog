
// components/RegisterAndLogin.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, isUsernameAuthorized } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/RegisterAndLogin.css';

const RegisterAndLogin = ({ actionType }) => {
    const dispatch = useDispatch();
    const [usernameRegister, setUsernameRegister] = useState("");
    const [usernameLogin, setUsernameLogin] = useState("");
    const isUserRegistered = useSelector(state => isUsernameAuthorized(state, usernameRegister))
    const isUserLogIn = useSelector(state => isUsernameAuthorized(state, usernameLogin));
    const navigate = useNavigate();


    //states to check for invalid inputs.
    const [containSpecialChar, setContainSpecialChar] = useState(false);
    const [usernameIsTooShort, setUsernameIsTooShort] = useState(false);
    const [userameIsAlreadyRegistered, setUsernameIsAlreadyRegistered] = useState(false);
    const [userIsNotRegistered , setUserIsNotRegistered] = useState(false);


    const handleRegister = (e) => {
        e.preventDefault();

        // Reset all the states.
        setUsernameIsAlreadyRegistered(false);
        setUsernameIsTooShort(false)

        if (usernameRegister.length < 3) {
            setUsernameIsTooShort(true);
            return;
        }

        if (isUserRegistered) {
            setUsernameIsAlreadyRegistered(true);
            return;
        }

        dispatch(register(usernameRegister));
        alert("Successfully registered! You can now log in.");
        setUsernameRegister(""); // clear the input
        navigate('/login')
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setUserIsNotRegistered(false);

        if (!isUserLogIn) {
            setUserIsNotRegistered(true);
            return;
        }

        dispatch(login(usernameLogin));
        alert("Successfully logged in!");
        setUsernameLogin(""); // clear the input
        navigate('/')
    };


    const onRegisterChange = (e) => {
        if (/^[a-zA-Z0-9]*$/.test(e.target.value)) {
            setUsernameRegister(e.target.value);
            setContainSpecialChar(false);
        }
        else {
            setContainSpecialChar(true);
        }
    }

    return (
        <>
            <div className="register-login-div">
                {actionType === 'register' ?
                    <div className="both-forms register-form-container">
                        <Link className="registerandlogin-link" to='/login' >Go To Login</Link>
                        <h2>Register</h2>
                        <form onSubmit={handleRegister}>
                            <div className="input-group">
                                <label className="both-labels" htmlFor="usernameRegister">Username:</label>
                                <br />
                                <input
                                    type="text"
                                    id="usernameRegister"
                                    value={usernameRegister}
                                    onChange={onRegisterChange}
                                    required
                                />
                            </div>
                            <div className="error-messages-div"> 
                                {containSpecialChar ? <span>Username cannot contain special characters. <br /></span> : <></>}
                                {userameIsAlreadyRegistered ? <span>Username is already registered. <br/> </span> : <></>}
                                {usernameIsTooShort ? <span>Username must contain atleast 3 characters. <br /> </span> : <></>}
                            </div>
                            <button type="submit" >Register</button>
                        </form>
                    </div>
                    :
                    <div className="both-forms login-form-container">
                        <Link className="registerandlogin-link" to='/register' >Go To Register</Link>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="login-input-group">
                                <label className="both-labels" htmlFor="usernameLogin">Username:</label>
                                <br />
                                <input
                                    type="text"
                                    id="usernameLogin"
                                    value={usernameLogin}
                                    onChange={(e) => setUsernameLogin(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="error-messages-div"> 
                                {userIsNotRegistered ? <span>Username does not exist. Please register before logging in. <br /></span> : <></>}
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                }
            </div>
        </>
    );
};

export default RegisterAndLogin;
