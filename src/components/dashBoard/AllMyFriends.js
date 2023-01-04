import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
import './Home.css';
import {useNavigate} from "react-router-dom";

const user = localStorage.getItem("user");
export default function AllMyFriends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        console.log("friends here")
        if(user === null) {
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

        axios.get(`http://localhost:8083/user/getAllFriends/${user}`, requestOptions)
            .then((res) => {
                console.log(res.data);
                setFriends(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [user])

    return (
        <following>
            <p typeof="Title">Following</p>
            {friends.map(friend => <Friend friend={friend.id} friend={friend}/>)}
        </following>
    )
}

function Friend(props) {
    const navigate = useNavigate();
    const data = props.friend;

    function routeLog(username) {
        navigate('/personal_log',{state: { user: username}})
    }

    function routeChat(username) {
        navigate('/chat',{state: { sender: user, receiver:username}})
    }

    return (
        <>
            <lbox>
                <p typeof="user">User: {data.userName}</p>
                <button className="log_button" key={data.userName} onClick={() => routeLog(data.userName)}>Log</button>
                <button className="chat_button" key={data.userName} onClick={() => routeChat(data.userName)}>Send Message</button>
            </lbox>
        </>
    );
}
