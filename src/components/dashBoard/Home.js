import * as React from 'react';
import './Home.css';
import {useEffect, useState} from "react";
import axios from "axios";
import AllMyFriends from "./AllMyFriends";

const username = localStorage.getItem("user");
export default function Home() {
    const [logs, setLogs] = useState([])
    const [text, setText] = useState('');

    useEffect(() => {

        console.log("here")
        if(username === null) {
            console.log("here")
            return;
        }
        const requestOptions = {
            withCredentials: true,
            data: { },
            headers : {
                'Content-Type': 'application/json'
            }
        };

        axios.get(`http://localhost:8082/personal_log/dash/${username}`, requestOptions)
            .then((res) => {
                console.log(res.data);
                setLogs(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [username])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            msg: text,
            userName: username
        })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };

        console.log(data);

        fetch("http://localhost:8082/personal_log/add", requestOptions)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
            console.log("error" + err);
        })
        setText('');
    }

    return (
        <>
            <home>
                <box>
                    <add>
                        <input typeof="add" value={text} onChange={(e) => setText(e.target.value)} placeholder="write new log"/>
                        <button className="add_button" type="submit" onClick={handleSubmit}>Submit</button>
                    </add>
                    <p>Logs</p>
                    {logs.map(log => <Log key={log.id} log={log}/>)}
                </box>
                <AllMyFriends/>
            </home>
        </>
    );
}

function Log(props) {
    const data = props.log;

    return (
        <>
            <lbox>
                <p>{data.msg}</p>
                <p typeof="user">User: {data.userName}</p>
                <p typeof="date">Posted: {data.date}</p>
            </lbox>
        </>
    );
}