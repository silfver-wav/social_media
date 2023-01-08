import * as React from "react";
import "../users/User.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const API_URL = "http://localhost:8083/user/add";

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleRegistration = (e) => {
        e.preventDefault();

        // Validate form
        if (!firstName || !lastName || !email || !username || !password) {
            alert("Please enter all required fields.");
            return;
        }

        const data = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: username,
            pwd: password,
        });

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
        };

        fetch(API_URL, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    console.error("Registration request failed:", response);
                } else {
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    };

    return (
        <>
            <Navbar />
            <section className="login_container">
                <div className="box">
                    <h1>Insert Details</h1>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="submit"
                        name=""
                        value="Register"
                        mt="xl"
                        onClick={handleRegistration}
                    ></input>
                </div>
            </section>
        </>
    );
};

export default Register;
