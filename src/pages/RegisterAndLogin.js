
// components/RegisterAndLogin.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, isUsernameAuthorized } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import '../styles/RegisterAndLogin.css';

const RegisterAndLogin = ({ actionType }) => {
    const dispatch = useDispatch();
    const [usernameRegister, setUsernameRegister] = useState("");
    const [usernameLogin, setUsernameLogin] = useState("");
    const isUserRegistered = useSelector(state => isUsernameAuthorized(state , usernameRegister))
    const isUserLogIn = useSelector(state => isUsernameAuthorized(state , usernameLogin));
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Check if username is already registered
        if (isUserRegistered) {
            alert("This username is already registered!");
            return;
        }

        dispatch(register(usernameRegister));
        alert("Successfully registered! You can now log in.");
        setUsernameRegister(""); // clear the input
        navigate('/login')
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!isUserLogIn) {
            alert("This username is not registered! Please register first.");
            navigate('/register')
            return;
        }

        dispatch(login(usernameLogin));
        alert("Successfully logged in!");
        setUsernameLogin(""); // clear the input
        navigate('/')
    };

    return (
        <>
            <div className="register-login-div">
                {actionType === 'register' ?
                    <div className="both-forms register-form-container">
                        <h2>Register</h2>
                        <form onSubmit={handleRegister}>
                            <div className="input-group">
                                <label className="both-labels" htmlFor="usernameRegister">Username:</label>
                                <br/>
                                <input
                                    type="text"
                                    id="usernameRegister"
                                    value={usernameRegister}
                                    onChange={(e) => setUsernameRegister(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" >Register</button>
                        </form>
                    </div>
                    :
                    <div className="both-forms login-form-container">
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="input-group">
                                <label className="both-labels" htmlFor="usernameLogin">Username:</label>
                                <br/>
                                <input
                                    type="text"
                                    id="usernameLogin"
                                    value={usernameLogin}
                                    onChange={(e) => setUsernameLogin(e.target.value)}
                                    required
                                />
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
