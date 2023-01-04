import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import './User.css';
import Navbar from "../navbar/Navbar";
import {useNavigate} from "react-router-dom";


export default function User() {
    const navigate = useNavigate();
    const username = localStorage.getItem("user");
    const [user, setUser] = useState({});
    useEffect(() => {

        const requestOptions = {
            withCredentials: true,
            data: { },
            headers : {
                'Content-Type': 'application/json'
            }
        };

        axios.get(`http://localhost:8083/user/${username}`, requestOptions )
            .then((res) => {
                console.log(res.data);
                setUser({...res.data.data});
                console.log(user)
            })
            .catch((err) => {
                console.log(err.response);
            });

    }, [username]);

    function routeLog(username) {
        navigate('/personal_log',{state: { user: username}})
    }

    return (
        <>
            <Navbar />
            <section className= "user_container">
                <div className = "name">First Name: {user.firstName}</div>
                <div className = "name">Last Name: {user.lastName}</div>
                <div className = "name">Username: {user.userName}</div>
                <div className = "name">Email: {user.email}</div>

                <button className="personal_log" key={user.userName} onClick={() => routeLog(user.userName)}>Personal log</button>
            </section>

        </>

    );
}