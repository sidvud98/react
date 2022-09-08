import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import "./styles.css";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [username, setname] = useState('');
  const [useremail, setemail] = useState('');
  const [userpassword, setpassword] = useState('');
  const [load, setload] = useState(false);
  function clickfn() {
    setload(true);
    axios.post('http://localhost:8000/api/users/signup', {
      name: username,
      email: useremail,
      password: userpassword,
      role: 'Normal',
      creator: 'someone'
    })
      .then(function (response) {
        setload(false);
        alert('You have been succesfully registered. Open your mail and confirm!!!');
        console.log(response.data);

      })
      .catch((error) => {
        setload(false);
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
  };
  let pstyle = {
    borderRadius: "8px",
    margin: "5px",
    position: "relative",
    left: "-5px"
  };

  let zstyle = {
    margin: "50px",
    position: "relative",
    top: "10px"
  };
  let wrapstyle = {
    width: "30%",
    height: "525px",
    position: "relative",
    top: "-60px",
    left: "450px",
    borderRadius: "9px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  };
  let picstyle = {
    position: "relative",
    left: "40px"
  };
  return (
    <div className="container">
      {load ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div style={wrapstyle}>
          <div style={zstyle}>
            <div style={picstyle}>
              <img src="https://cdn5-ss11.sharpschool.com/UserFiles/Servers/Server_60962/Image/About/Student%20Registration/Registratioin.jpg" />
            </div>
            <form onSubmit={clickfn}>
              <label><b>Username</b></label>
              <input style={xstyle} onChange={(e) => { e.preventDefault(); const userName = e.target.value; setname(userName); }} type="text" required />
              <br />
              <label><b>Email Address</b></label>
              <input style={xstyle} onChange={(e) => { e.preventDefault(); const userEmail = e.target.value; setemail(userEmail); }} type="text" placeholder="Enter your email" value={useremail} required />
              <br />
              <label><b>Password   (Strong)</b></label>
              <input style={xstyle} onChange={(e) => { e.preventDefault(); const userPassword = e.target.value; setpassword(userPassword); }} name="password" type="password" placeholder="Enter your Password" value={userpassword} required />
              <div className="App">
                <ReCAPTCHA
                  sitekey="6Ldo3pohAAAAAIIh7-J_Mtg6-HWAS3HdXpzDfmrM"
                  onChange={(value) => { console.log('Captcha value:', value); }}
                />
              </div>
              <button style={pstyle} type="submit" >Sign Up</button>
            </form>
            <p>Already a User? Login <Link to="/login" >here</Link></p>
          </div>
        </div>
      )}
    </div>
  )
}
export default Register;