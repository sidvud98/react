import React, { Component } from 'react';
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useState } from 'react';
import axios from 'axios';
function ResetPassword() {

    const [userpassword, setuserpassword] = useState('')
    const [useremail, setuseremail] = useState('');
    const [userrepassword, setuserrepassword] = useState('');
    let navigate = useNavigate();
    let tokenurl = new URL(window.location.href);
    let validtoken = tokenurl.searchParams.get("token");

    function clickfn(event) {
        event.preventDefault();

        axios.post('http://localhost:8000/password/reset', {
            email: useremail,
            password: userpassword,
            password_confirmation: userrepassword,
            token: validtoken
        })
            .then(function (response) {
                alert("Your Password has been reset successfully");
                console.log(response.data);
                navigate('/login');
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }
    let xstyle = {
        borderRadius: "8px"
    };
    return (
        <div>

            <form>
                <label><b>Email Address</b></label>
                <input style={xstyle} onChange={(e) => { e.preventDefault(); const useremail = e.target.value; setuseremail(useremail); }} type="text" placeholder="Enter your email" value={useremail} required />
                <br />
                <label><b>New Password</b></label>
                <input style={xstyle} onChange={(e) => { e.preventDefault(); const userPassword = e.target.value; setuserpassword(userPassword); }} type="text" placeholder="Enter your email" value={userpassword} required />
                <br />
                <label><b>Re-enter your New Password</b></label>
                <input style={xstyle} onChange={(e) => { e.preventDefault(); const userrePassword = e.target.value; setuserrepassword(userrePassword); }} type="password" placeholder="Enter your Password" value={userrepassword} required />

            </form>
            <button style={xstyle} onClick={clickfn}>Reset Password</button>
        </div>
    )
}
export default ResetPassword;