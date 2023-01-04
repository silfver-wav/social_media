import * as React from 'react';
import '../users/User.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";


const Register = () => {
    const navigate = useNavigate();

    const[firstName, setFirstName]=React.useState('')
    const[lastName, setLastName]=React.useState('')
    const[email, setEmail]=React.useState('')
    const[userName, setUsername]=React.useState('')
    const[pwd, setPassword]=React.useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const data = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            pwd: pwd
        })

        console.log(data)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };

        fetch("http://localhost:8083/user/add",requestOptions)
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else navigate("/login");
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ requestFailed: true });
            });
    }

    return (
        <>
        <Navbar />
        <section className="login_contianer">
            <div class="box">
                <h1>Insert Details</h1>
                <input type="text" name="firstname" placeholder="First Name"
                       value={firstName}
                       onChange={(e)=>setFirstName(e.target.value)}
                />
                <input type="text" name="lastname" placeholder="Last Name"
                       value={lastName}
                       onChange={(e)=>setLastName(e.target.value)}
                />
                <input type="text" name="email" placeholder="Email"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="text" name="username" placeholder="Username"
                       value={userName}
                       onChange={(e)=>setUsername(e.target.value)}
                />
                <input type="password" name="password" placeholder="Password"
                       value={pwd}
                       onChange={(e)=>setPassword(e.target.value)}
                />
                <input type="submit" name="" value="Register" mt="xl" onClick={handleClick}>
                </input>
            </div>
        </section>
        </>
    );
}

export default Register;