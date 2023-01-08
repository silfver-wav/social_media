import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Register from './components/register/Register';
import Login from "./components/login/Login";
import PersonalLog from "./components/personalLog/PersonalLog";
import User from "./components/users/User";
import Users from "./components/users/Users";
import Chat from "./components/chat/Chat";
import ChartContainer from "./components/chart/ChartContainer";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="user" element={<User />} />
            <Route path="personal_log" element={<PersonalLog />} />
            <Route path="users" element={<Users />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chart" element={<ChartContainer />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
