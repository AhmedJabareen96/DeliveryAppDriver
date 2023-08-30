import React from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './ForgotYourPassword.module.css';

const ForgotYourPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className={styles['fyp-form-wrapper']}>
            <div className={styles['forgot-password-form']}>
                <div className={styles['fp-welcome-text']}>Forgot Your Password?</div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="forgot-email"
                        label="Email"
                        variant="standard"
                        className={styles['text-field']}
                    />
                    <Button type="submit" variant="contained" className={styles['button']}>
                        Submit
                    </Button>
                    <div className={styles['link']}>
                        <Link to="/login">Return to home page</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotYourPassword;
