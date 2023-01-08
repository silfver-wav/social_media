import * as React from 'react';
import './PersonalLog.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import {useLocation} from "react-router-dom";
import Chart from "../chart/Chart";

export default function PersonalLog(props) {
    const location = useLocation();
    const username = location.state.user;

    const [data, setData] = useState([])

    useEffect(() => {

        const requestOptions = {
            withCredentials: true,
            data: { },
            headers : {
                'Content-Type': 'application/json'
            }
        };

        axios.get(`http://localhost:8082/personal_log/${username}`, requestOptions)
            .then((res) => {
                console.log(res.data);
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [])

    console.log(data);

    if (data === null) {
        return (
            <>
                <Navbar />
                <section className="log_container">
                    <h2 className="title">Personal Log</h2>
                </section>
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <section className="log_container">
                    <h2 className="title">Personal Log</h2>
                    {data.map(data => {
                        if (data.type === "text") {
                            return (
                                <div className="log-box">
                                    <p className="msg">{data.msg}</p>
                                    <p className="user">By: {data.userName}</p>
                                </div>
                            )
                        } else if (data.type === "chart") {
                            return (
                                <div className="log-box">
                                    <Chart data={data} chartType={data.chartType} log={"data"}/>
                                    <p className="user">By: {data.userName}</p>
                                </div>
                            )
                        }
                    })}
                </section>
            </>
        )
    }
};