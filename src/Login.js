import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import logo from "./login.png";
function Login() {
    const [useremail, setemail] = useState('')
    const [userpassword, setpassword] = useState('');
    const [load, setload] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        console.log(user);
        if (user && user.loggedIn) {
            navigate('/dashboard');
            console.log(user, user.loggedIn);
        }
    }, [])
    function clickfn(e) {
        e.preventDefault();
        setload(true);
        axios.post('http://localhost:8000/api/users/login', {
            email: useremail,
            password: userpassword,
        })
            .then(function (response) {
                setload(false);
                dispatch(login({
                    userid: response.data.user.id,
                    name: response.data.user.name,
                    email: useremail,
                    password: userpassword,
                    loggedIn: true,
                    emailverification: true,
                    email_verified_at: response.data.user.email_verified_at,
                    role: response.data.user.role,
                    verifytoken: response.data.access_token,
                }))
                localStorage.setItem('user', JSON.stringify(response.data));
                if (response.data.user.email_verified_at !== null) { navigate('/dashboard') }
                else { navigate('/emailverification') };
            })
            .catch((error) => {
                setload(false);
                if (error.response) {
                    if (error.response.data.error == 'Unauthorized') alert("Invalid Email or Password");
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    }
    let xstyle = {
        borderRadius: "8px",
        width: "85%"
    };
    let forpas = {
        fontSize: "13px"
    };
    let formsdiv = {
        position: "relative",
        top: "20px",
        left: "30px",
        width: "100%"
        // margin: "50px"
    };
    let wrapsty = {
        width: "30%",
        height: "400px",
        borderRadius: "9px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        position: "relative",
        left: "450px",
        // top: "120px"
    };
    let pic = {
        position: "relative",
        // top: "-100px",
        left: "20px"
    };
    return (
        <div className="container">
            {load ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div style={wrapsty}>
                    <div style={formsdiv}>
                        <div style={pic}>
                            <img src={logo} />
                        </div>
                        <form onSubmit={clickfn}>
                            <label><b>Email Address</b></label><br />
                            <input style={xstyle} onChange={(e) => { e.preventDefault(); const userEmail = e.target.value; setemail(userEmail); }} type="text" placeholder="Enter your email" value={useremail} required />
                            <br />
                            <label><b>Password</b></label><br />
                            <input style={xstyle} onChange={(e) => { e.preventDefault(); const userPassword = e.target.value; setpassword(userPassword); }} type="password" placeholder="Enter your Password" value={userpassword} required /><br />
                            <p style={forpas}>Forgot Password ? Click <Link to="/requestpasswordreset" >here</Link></p>
                            <button style={xstyle} type="submit">Login</button>
                        </form>
                    </div>

                </div>
            )}
        </div>
    )
}
export default Login;