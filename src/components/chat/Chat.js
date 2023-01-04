import * as React from 'react';
import './Chat.css';
import Navbar from "../navbar/Navbar";
import {useEffect, useRef, useState} from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from "axios";
import {useLocation} from "react-router-dom";
import ImageIcon from '@mui/icons-material/Image';

const user = localStorage.getItem("user");
export default function Chat() {
    const location = useLocation();
    const sender = location.state.sender;
    const receiver = location.state.receiver;
    const dummy = useRef();
    const [messageValue, setMessageValue] = useState('');
    const [fileValue, setFileValue] = useState('');

    const [messages, setMessages] = useState([]);

    let socket = new SockJS('http://localhost:8081/chat');
    let stompClient = Stomp.over(socket);

    useEffect(() => {
        getPrevious();
        stompClient.connect({}, onConnected, onError)
    }, [])

    const onConnected = () => {
        stompClient.subscribe('/topic/public', onMessageReceived);
        stompClient.subscribe('/user/'+user+'/private', onMessageReceived);
        //stompClient.subscribe('/topic/photo', onPhotoReceived);
    }

    const onError = (err) => {
        console.log(err);
    }

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        if (payloadData) {
            messages.push(payloadData);
            setMessages([...messages]);
        }
    }

    const onPhotoReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        if (payloadData) {
            //messages.push(payloadData);
            setMessages([...messages]);
        }
    }

    const getPrevious = () => {
        console.log("receiver: "+receiver)

        const requestOptions = {
            withCredentials: true,
            data: { },
            headers : {
                'Content-Type': 'application/json'
            }
        };

        axios.get(`http://localhost:8081/message/${sender}/${receiver}`, requestOptions)
            .then((res) => {
                console.log(res.data);
                //messages.push(res.data.data);
                setMessages([...res.data.data]);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }


    const sendMessage = async (e) => {
        e.preventDefault();
        if (stompClient) {
            if (fileValue !== '') {
                /*
                                let file = fileValue;
                let formData = new FormData();
                formData.append('file',file)
                formData.append('properties', new Blob([JSON.stringify({
                    "name": "root",
                    "password": "root"
                })], {
                    type: "application/json"
                }));
                stompClient.send("/chat/sendPhoto", {headers: {"Content-Type": undefined}}, JSON.stringify(formData));
                 */
                const chatMessage = {
                    sender: sender,
                    receiver: receiver,
                    file: fileValue,
                };
                console.log(chatMessage);
                stompClient.send('/chat/private-message', {}, JSON.stringify(chatMessage));

                messages.push(chatMessage);
                setMessages([...messages]);

                setFileValue('');
            } else if (messageValue !== '') {
                console.log("here");
                const chatMessage = {
                    sender: sender,
                    receiver: receiver,
                    text: messageValue,
                };
                console.log(chatMessage);
                stompClient.send('/chat/private-message', {}, JSON.stringify(chatMessage));

                messages.push(chatMessage);
                setMessages([...messages]);
                setMessageValue('');
            }
        }
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    const disconnect = () => {
        stompClient.disconnect();
    }


    return (
        <>
            <Navbar/>

            <div className="App">
                <header>
                    <h1>{receiver}</h1>
                </header>

            </div>

            <main>
                {messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
                <span ref={dummy}></span>
            </main>


            <form onSubmit={sendMessage}>
                <input id="file-upload" type="file" name="file" accept="image/*" onChange={(e) => setFileValue(e.target.value)}/>
                <input value={messageValue} onChange={(e) => setMessageValue(e.target.value)} placeholder="type here!"/>
                <button type="submit">🕊️</button>
            </form>

            <image>
                <label htmlFor="file-upload">
                    <ImageIcon/>
                </label>
            </image>


        </>
    )
}

function ChatMessage(props) {
        const msg = props.message;

        const messageClass = msg.sender === user ? 'sent' : 'received';
        let render;
        if (msg.text === (null)) {
            console.log("image");
            render = <img src={msg.file} />;
        } else {
            console.log("text");
            render = <p>{msg.text}</p>;
        }
        return (<>
            <div className={`message ${messageClass}`}>
                {render}
            </div>
        </>)
}