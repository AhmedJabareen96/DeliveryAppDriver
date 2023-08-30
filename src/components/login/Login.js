import React, { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const { username, setUsername } = useContext(UserContext);
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    function handleLoginButton() {
        console.log(username);
        console.log(password);
        axios.post("http://localhost:5000/delivers/loginEmail", {
            email: username,
            password: password
        }).then(() => {
            console.log(`Hello ${username}`);
            localStorage.setItem("username",username);
            navigate('/');
        }).catch(err => {
            console.log(err);
            setUsername("");
            setErrorMessage('Invalid email/password');
        });
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }   

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    return (
        <div className={styles['login-form-wrapper']}>
            <div className={styles['login-form']}>
                <div className={styles['welcome-text']}>Welcome to Driver's console!</div>
                <p>Login to view orders</p>
                <TextField
                    id="loginm-username"
                    label="Email"
                    variant="standard"
                    className={styles['text-field']}
                    onChange={handleUsernameChange}
                />
                <TextField
                    id="loginm-password"
                    label="Password"
                    variant="standard"
                    type="password"
                    className={styles['password-field']}
                    onChange={handlePasswordChange}
                />
                <Button variant="contained" className={styles['button']} onClick={handleLoginButton}>
                    Login
                </Button>
                {errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}
                <p>
                    Forgot your password? <Link to="/forgot-password">Reset here</Link>
                </p>
                <p>
                    Don't have an account? <Link to="/register">Click here to register</Link>
                </p>
            </div>
        </div>
        );
};

export default Login;
