import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import { useState } from "react";
import Navbar from "../navbar/Navbar";

const API_URL = "http://localhost:8083/user/login";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate form
        if (!username || !password) {
            alert("Please enter a username and password.");
            return;
        }

        const data = JSON.stringify({
            userName: username,
            pwd: password,
        });

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
        };

        fetch(API_URL, requestOptions)
            .then((res) => {
                if (!res.ok) {
                    setLoginFailed(true);
                } else {
                    localStorage.setItem("user", username);
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <Navbar />
            <section className="register_container">
                <form className="box" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <input
                        type="text"
                        name="Username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Login" />
                    <input
                        type="newAccount"
                        value="Create New Account"
                        onClick={() => navigate("/register")}
                    />
                </form>
                {loginFailed && <div className="login-failed-message">Login failed. Please try again.</div>}
            </section>
        </>
    );
};
export default Login;

