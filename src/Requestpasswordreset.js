import React, { Component } from 'react';
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useState } from 'react';
import axios from 'axios';
function Requestpasswordreset() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [useremail, setemail] = useState('');
  const [load, setload] = useState(false);
  let navigate = useNavigate();
  function clickfn(event) {
    setload(true);
    event.preventDefault();
    axios.post('http://localhost:8000/password/reset-request', {
      email: useremail
    })
      .then(function (response) {
        setload(false);
        alert("Reset link has been sent to your email. Please check");
        console.log(response.data);
      })
      .catch((error) => {
        setload(false);
        console.log(error)
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
    <div className="container">
      {load ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="password">
          <img src="https://media.istockphoto.com/vectors/lock-refresh-vector-id1144134392?k=20&m=1144134392&s=612x612&w=0&h=Sl3Q7_-3PYnU_gu5AejMKsuCu8UGWUfM2aiutpy6ha4=" />
          <form>
            <input onChange={(e) => { e.preventDefault(); const userEmail = e.target.value; setemail(userEmail); }} type="email" placeholder="Enter your email address" size="30" value={useremail} required />
            <button style={xstyle} onClick={clickfn}>Send</button>
          </form>

        </div>
      )}
    </div>
  )
}
export default Requestpasswordreset