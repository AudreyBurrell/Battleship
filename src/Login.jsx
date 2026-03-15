import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/set-board')
    }

    return (
        <div className="background-card">
            <p>Login to Battleship</p>
            <div className="form-area">
                <label htmlFor="username">Username:</label>
                {/*put in the value changing stuff later*/}
                <input type="text" id="username" name="username" required /> 
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div className="button-area">
                <button className="mainBtn" onClick={handleLogin}>Login</button>
                <button className="secondaryBtn">Create Account</button>
                <button className="thirdBtn">Continue Without Account</button>
            </div>
        </div>
    )
}

export default Login;

/* 
Things that should happen/I need to implement:
1. Another page for create account
2. Backend storing stuff
3. When the user hits the third button, it displays a popup (making sure the user is okay with
not saving stats)

*/