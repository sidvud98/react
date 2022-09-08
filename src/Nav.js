import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Nav() {
    let navigate = useNavigate();
    let style = {
        fontSize: "20px",
        borderRadius: "10px",
        margin: "10px",
        width: "125px",
        textAlign: "center",
        position: "relative",
        left: "-85px"
    };
    let Boxstyle = {
        position: "relative",
        left: "85px",
        top: "8px"
    };
    let Boxstyle2 = {
        position: "relative",
        left: "120px"
    };
    let shad = {
        width: "25%",
        borderRadius: "9px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        position: "relative",
        left: "500px",
        top: "120px"
    };

    return (
        <div style={shad}>
            <h1 style={Boxstyle}>Hello there!</h1>
            <div style={Boxstyle2}>
                <button style={style} onClick={(e) => { navigate('/login') }} >Login</button>
                <button style={style} onClick={(e) => { navigate('/register') }} >Register</button>
            </div>
        </div>
    )
}
export default Nav