import * as React from 'react';
import '../personalLog/PersonalLog.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import {useNavigate} from "react-router-dom";

export default function Users() {
    let user = localStorage.getItem("user");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const requestOptions = {
            withCredentials: true,
            data: { },
            headers : {
                'Content-Type': 'application/json'
            }
        };

        axios.get(`http://localhost:8083/user/getAllUsers/${user}`, requestOptions)
            .then((res) => {
                console.log(res.data);
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [])


    function routeLog(username) {
        alert(`hello, ${username}`);
        navigate('/personal_log',{state: { user: username}})
    }

    function routeChat(username) {
        navigate('/chat',{state: { sender: user, receiver:username}})
    }

    function routeFollow(username) {

        const data = JSON.stringify({
            userName: user,
        })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };

        fetch(`http://localhost:8083/user/follow/${username}`, requestOptions)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
            console.log("error" + err);
        })
    }

    return (
        <>
            <Navbar />
            <section className="log_container">
                <h2 className="title">Users</h2>
                {data.map(data => {
                    return (
                        <div className="log-box">
                            <p className = "user">First Name: {data.firstName}</p>
                            <p className = "user">Last Name: {data.lastName}</p>
                            <p className = "user">Username: {data.userName}</p>
                            <p className = "user">Email: {data.email}</p>
                            <button key={data.userName} onClick={() => routeLog(data.userName)}>View log</button>
                            <button key={data.userName} onClick={() => routeChat(data.userName)}>Send Message</button>
                            <button key={data.userName} onClick={() => routeFollow(data.userName)}>Follow</button>
                        </div>
                    )
                })}
            </section>
        </>
    )
};
