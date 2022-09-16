import React, { Component } from 'react';
import "./styles.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';
import { relativeLength } from 'highcharts';




function CreateUser() {
    const [userName, setuserName] = useState('')
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const loggedout = (e) => {
        dispatch(logout());
        navigate('/login');
    };
    let role = JSON.parse(localStorage.getItem('user')).user.role;
    function clickfn(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/signup', {
            name: userName,
            email: email,
            password: password,
            role: 'Normal',
            creator: 'admin'
        })
            .then(function (response) {
                alert("User Created Succesfully");
                navigate("/getallusers");
            })
            .catch((error) => {

                if (error.response) {
                    if (error.response.data.error);
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
    };
    let ps = {
        position: "relative",
        left: "140px"
    };
    let zstyle = {
        borderRadius: "8px",
        margin: "10px",
    };
    let formstyle = {
        width: "30%",
        position: "relative",
        left: "525px",
        top: "80px"
    };
    return (
        <div>
            <Navbar className='navbary' dis="cu" rol={role}/>
            <div style={formstyle}>
                <form onSubmit={clickfn}>
                    <label><b>Name </b></label>
                    <input style={xstyle} onChange={(e) => { e.preventDefault(); const userName = e.target.value; setuserName(userName); }} placeholder="username" type="text" required />

                    <label><b>Mail </b></label>
                    <input style={xstyle} onChange={(e) => { e.preventDefault(); const email = e.target.value; setemail(email); }} type="text" placeholder="email id" required />

                    <label><b>Password</b></label>
                    <input style={xstyle} onChange={(e) => { e.preventDefault(); const pass = e.target.value; setpassword(pass); }} type="password" placeholder="strong password" required />
                    <div style={ps}>
                        <button style={zstyle} type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateUser;