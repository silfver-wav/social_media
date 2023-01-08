import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const currentUser = localStorage.getItem('user');

export default function AllMyFriends() {
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        console.log('friends here');
        if (currentUser === null) {
            console.log('here');
            return;
        }

        const requestOptions = {
            withCredentials: true,
            data: {},
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .get(`http://localhost:8083/user/getAllFriends/${currentUser}`, requestOptions)
            .then((res) => {
                console.log(res.data);
                setFriendList(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [currentUser]);

    return (
        <following>
            <p type="Title">Following</p>
            {friendList.map((friend) => (
                <Friend key={friend.userName} friend={friend} />
            ))}
        </following>
    );
}

function Friend(props) {
    const { friend } = props;
    const navigate = useNavigate();

    const handleLogClick = (username) => {
        navigate('/personal_log', { state: { user: username } });
    };

    const handleChatClick = (username) => {
        navigate('/chat', { state: { sender: currentUser, receiver: username } });
    };

    return (
        <>
            <lbox>
                <p type="user">User: {friend.userName}</p>
                <button className="log_button" key={friend.userName} onClick={() => handleLogClick(friend.userName)}>
                    Log
                </button>
                <button
                    className="chat_button"
                    key={friend.userName}
                    onClick={() => handleChatClick(friend.userName)}
                >
                    Send Message
                </button>
            </lbox>
        </>
    );
}

Friend.propTypes = {
    friend: PropTypes.shape({
        userName: PropTypes.string.isRequired,
    }).isRequired,
};