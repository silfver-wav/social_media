import React, {useEffect} from 'react'
import "./style.css"
import {useNavigate} from "react-router-dom";
import {FaHome} from "react-icons/all";

export default function Navbar() {
    let user = localStorage.getItem("user");
    let isLoggedIn = localStorage.getItem("user");

    const navigate = useNavigate();

    const routeRegister = () =>{
        navigate("/register");
    }

    const routeLogin = () =>{
        navigate("/login");
    }

    const routeUser = () =>{
        navigate("/user");
    }

    const routeUsers = () =>{
        navigate("/users");
    }

    const logout = () => {
        console.log("log out")
        localStorage.setItem("user", null);
        isLoggedIn = null;
        navigate("/");
    }

    let button;
    if (isLoggedIn === null || isLoggedIn.match(null)) {
        button = <a onClick={routeLogin}>Login</a>;
    } else {
        button = <a onClick={logout}>Logout</a>;
    }

    return (
        <header>
            <div className="nav">
                <a href="/" className="site-title"><FaHome /> </a>
                <ul>
                    <li>
                        <a onClick={routeUser}>User</a>
                    </li>
                    <li>
                        <a onClick={routeUsers}>Users</a>
                    </li>
                    <li>
                        <a onClick={routeRegister}>Create Account</a>
                    </li>
                    <li>
                        {button}
                    </li>
                </ul>
            </div>
        </header>
        )
}
