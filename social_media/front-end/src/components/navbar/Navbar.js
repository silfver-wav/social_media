import React from 'react'
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/all";

export default function Navbar() {
    // Get the user data from local storage
    const user = localStorage.getItem("user");
    let isLoggedIn;
    // Check if the user is logged in
    if (user === null) {
        // If the user is not logged in, redirect to the login page
        isLoggedIn = false;
    } else {
        // If the user is logged in, redirect to the home page
        isLoggedIn = true;
    }

    const navigate = useNavigate();

    // Function to navigate to a specific route
    const navigateTo = (route) => {
        navigate(route);
    };

    // Function to log out the user
    const logout = () => {
        console.log("log out");
        localStorage.setItem("user", null);
        isLoggedIn = false;
        navigateTo("/");
    };

    // Render the appropriate button based on the login status
    let button;
    if (isLoggedIn) {
        button = <button onClick={logout}>Logout</button>;
    } else {
        button = <button onClick={() => navigateTo("/login")}>Login</button>;
    }

    return (
        <header>
            <div className="nav">
                <a href="/" className="site-title"><FaHome /> </a>
                <ul>
                    <li>
                        <a onClick={() => navigateTo("/chart")}>Chart</a>
                    </li>
                    <li>
                        <a onClick={() => navigateTo("/user")}>User</a>
                    </li>
                    <li>
                        <a onClick={() => navigateTo("/users")}>Users</a>
                    </li>
                    <li>
                        <a onClick={() => navigateTo("/register")}>Create Account</a>
                    </li>
                    <li>
                        {button}
                    </li>
                </ul>
            </div>
        </header>
    );
}

