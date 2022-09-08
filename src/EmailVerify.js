import React, { Component } from 'react';
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import axios from 'axios';
function EmailVerify() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    let tokenurl = new URL(window.location.href);
    let validtoken = tokenurl.searchParams.get("token");
    console.log(validtoken);
    function clickfn() {
        axios.post('http://localhost:8000/email/verify', {
            token: validtoken
        })
            .then(function (response) {
                alert("Your email has been verified successfully");
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
        borderRadius: "8px",
        position: "relative",
        left: "200px",
        top: "20px"
    };
    let pos = {
        position: "relative",
        left: "450px"
    };
    return (
        <div style={pos}>
            <h1>Click the below button to verify</h1>
            <button style={xstyle} onClick={clickfn}>Verify</button>
        </div>
    )
}
export default EmailVerify;