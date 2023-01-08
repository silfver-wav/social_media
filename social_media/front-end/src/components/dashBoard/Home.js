import * as React from 'react';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AllMyFriends from './AllMyFriends';

const username = localStorage.getItem('user');

export default function Home() {
    const [logs, setLogs] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetchLogs();
    }, []); // Only run this effect once

    const fetchLogs = async () => {
        if (username === null) {
            return;
        }

        try {
            const requestOptions = {
                withCredentials: true,
                data: {},
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.get(
                `http://localhost:8082/personal_log/dash/${username}`,
                requestOptions
            );
            setLogs(res.data.data);
        } catch (err) {
            console.error(err.response);
            // Display an error message to the user
            alert('Failed to fetch logs from server');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            msg: text,
            userName: username,
            type: 'text',
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data,
        };

        try {
            await fetch('http://localhost:8082/personal_log/add', requestOptions);

            // Clear input field
            setText('');
        } catch (err) {
            console.error('error', err);
        }
    };

    return (
        <>
            <home>
                <box>
                    <add>
                        <input
                            type="add"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="write new log"
                        />
                        <button className="add_button" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </add>
                    <p>Logs</p>
                    {logs.map((log) => (
                        <Log key={log.id} log={log} />
                    ))}
                </box>
                <AllMyFriends />
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