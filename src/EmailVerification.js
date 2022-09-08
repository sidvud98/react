import React, { Component } from 'react';
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import axios from 'axios';
function EmailVerification() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    function verifyfunc() {
        axios.post('http://localhost:8000/email/request-verification', {}, {
            headers:
            {
                'Authorization': "Bearer" + user.verifytoken
            }
        }

        ).then(function (response) {
            alert('Verification link sent. Please check your email');
            console.log(response.data);
        })

    }
    let xstyle = {
        borderRadius: "8px",
        width: "175px"
    };
    let pos = {
        position: "relative",
        left: "-200px"
    };
    return (
        <div className="welcome"  style={pos}>
            {/* <img className="welcomeimage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH4EaKq-_Wj14z7qsgody0T4ikOJ9TIAS1iAmPSRMYYEhM1yv9vQzQhgdsTyHzl42Xefc&usqp=CAU://cdn5.vectorstock.com/i/1000x1000/48/74/hand-drawn-of-welcome-logo-vector-23994874.jpg"/> */}
            <p >Thanks for Registering. To confirm your account, press the button below.</p>
            <button style={xstyle} onClick={verifyfunc}>Verify your Account</button>
        </div>
    )
}
export default EmailVerification;