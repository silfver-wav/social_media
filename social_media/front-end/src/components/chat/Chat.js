import * as React from 'react';
import './Chat.css';
import Navbar from "../navbar/Navbar";
import {useEffect, useRef, useState} from "react";
import {KafkaClient, Consumer} from 'kafka-node';
import axios from "axios";
import {useLocation} from "react-router-dom";

const user = localStorage.getItem("user");
export default function Chat() {
    const location = useLocation();
    const sender = location.state.sender;
    const receiver = location.state.receiver;
    const dummy = useRef();
    const [messageValue, setMessageValue] = useState('');
    const [fileValue, setFileValue] = useState('');

    const [messages, setMessages] = useState([]);

    const client = new KafkaClient({kafkaHost: 'localhost:9092'});
    const consumer = new Consumer(
        client,
        [
            { topic: '/topic/public' },
            { topic: `/user/${user}/private` },
        ],
        {
            autoCommit: true,
        }
    );

    useEffect(() => {
        console.log("chat");
        getPrevious();
        consumer.on('message', onMessageReceived);
        consumer.on('error', onError);
    }, [])

    const onError = (err) => {
        console.log(err);
    }

    const onMessageReceived = (message) => {
        const payloadData = JSON.parse(message.value);
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
        if (consumer) {
            if (fileValue !== '') {
                const chatMessage = {
                    sender: sender,
                    receiver: receiver,
                    file: fileValue,
                };
                console.log(chatMessage);
                consumer.send([{topic: '/user/private', messages: JSON.stringify(chatMessage)}]);

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
                consumer.send([{topic: '/user/private', messages: JSON.stringify(chatMessage)}]);

                messages.push(chatMessage);
                setMessages([...messages]);
                setMessageValue('');
            }
        }
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    const disconnect = () => {
        consumer.close();
    }

    return (
        <>
            <Navbar/>

            <div className="App">
                <header>
                    <h1>{receiver}</h1>
                </header>
                <div className="messages" ref={dummy}>
                    {
                        messages.map((message, index) => {
                            return(
                                <div key={index} className={message.sender === sender ? "sent-message" : "received-message"}>
                                    {
                                        message.text ? <p>{message.text}</p> : <img src={message.file} alt=""/>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <form onSubmit={sendMessage}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Enter your message</label>
                        <input type="text" className="form-control" value={messageValue} onChange={e => setMessageValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input type="file" className="form-control-file" value={fileValue} onChange={e => setFileValue(e.target.value)} id="exampleFormControlFile1"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            </div>
        </>
    );
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