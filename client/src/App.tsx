import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { login, LOGIN_STATE, checkLogin, logout } from './services/ApiService';

const App: React.FC = () => {
    const [username, setUsername] = useState('');
    const [loginStatus, setLoginStatus] = useState(LOGIN_STATE.CHECKING_STATUS);

    useEffect(() => {
        check();
    }, [loginStatus]);

    const check = async () => {
        try {
            const user = await checkLogin();
            setUsername(user.username);
            setLoginStatus(LOGIN_STATE.LOGGED_IN);
        } catch (err) {
            setLoginStatus(LOGIN_STATE.LOGGED_OUT);
        }
    };

    const logIn = async () => {
        try {
            const response = await login(
                (document.getElementById('username') as HTMLInputElement).value,
                (document.getElementById('password') as HTMLInputElement).value,
            );
            setUsername(response.user.username);
            setLoginStatus(LOGIN_STATE.LOGGED_IN);
        } catch (err) {
            setLoginStatus(LOGIN_STATE.LOGGED_OUT);
        }
    };

    const handleLogout = () => {
        logout();
        setLoginStatus(LOGIN_STATE.LOGGED_OUT);
        setUsername('');
    };

    return (
        <div className="App">
            <header className="App-header">
                {loginStatus === LOGIN_STATE.CHECKING_STATUS && <div>Loading...</div>}
                {loginStatus === LOGIN_STATE.LOGGED_IN && (
                    <div>
                        <button id="logoutButton" onClick={handleLogout}>
                            Logout
                        </button>
                        <br />
                        Logged in as
                    </div>
                )}
                {loginStatus === LOGIN_STATE.LOGGED_OUT && (
                    <div>
                        <label htmlFor="username">Username</label>
                        <br />
                        <input id="username" />
                        <br />
                        <label htmlFor="password">password</label>
                        <br />
                        <input id="password" />
                        <br />
                        <button id="loginButton" onClick={logIn}>
                            Login
                        </button>
                    </div>
                )}
                {username}
            </header>
        </div>
    );
};

export default App;
