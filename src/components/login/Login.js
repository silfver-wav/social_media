import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import {useState} from "react";
import Navbar from "../navbar/Navbar";

const Login = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [pwd, setpassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            userName: username,
            pwd: pwd
        })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };

            fetch("http://localhost:8083/user/login", requestOptions)
                .then((res) => {
                    if (!res.ok) alert("Login Failed");
                    else {
                        console.log(JSON.stringify(res));
                        localStorage.setItem("user", username)
                        navigate("/")
                    }

            }).catch((err) => {
                console.log("error" + err);
            })

    };

    const routeRegister = () =>{
        navigate("/register");
    }
    return (
        <>
            <Navbar />
            <section className="login_contianer">
                <form className="box" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input type="text" name="Username" placeholder="Username"
                           value={username}
                           onChange={(e) => setusername(e.target.value)}
                    />
                    <input type="password" name="Password" placeholder="Password"
                           value={pwd}
                           onChange={(e) => setpassword(e.target.value)}
                    />
                    <input type="submit" value="Login"/>
                    <input type="newAccount" value="Create New Account" onClick={routeRegister}/>
                </form>
            </section>
        </>
    )
};
export default Login;