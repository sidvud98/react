import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { login } from "./features/userSlice";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let navigate = useNavigate();
  const [want_to_edit, setwant_to_edit] = useState(true);
  const [username, setname] = useState('');
  const loggedout = (e) => {
    dispatch(logout());
    navigate('/login');
  };
  function deleteacc(e) {
    e.preventDefault();
    axios.delete('http://localhost:8000/api/users/' + user.userid, {}, {
      headers:
      {
        'Authorization': "Bearer " + user.verifytoken
      }
    })
      .then(function (response) {
        alert("Your account has been deleted succesfully")
        dispatch(logout());
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
  function clickfnfn(e) {
    e.preventDefault();
    axios.put('http://localhost:8000/api/users/' + user.userid, {
      name: username,
    })
      .then(function (response) {
        dispatch(login({
          id: user.userid,
          name: username,
          email_verified_at: user.email_verified_at,
          loggedIn: true,
          role: user.role,
          email: user.email
        }))
        setwant_to_edit((prev) => !prev);
        navigate('/dashboard');
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
  let navstyle = {
    width: "100%"
  };
  let profstyle = {
    position: "relative",
    top: "-30px"
  };
  return (
    <div className="containerz">
     <div className='navbary'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
          <a className="navbar-brand" href="#"><em>&nbsp;&nbsp;DeMock</em></a>
          <div className="d-flex navbar-nav container-fluid">
            <div className='d-flex'>
              <p className="dis disabled" style={{color: "white"}}>Dashboard</p>
              {user.role== 1 && <button className="allUsers nav-item nav-link active" onClick={(e) => navigate('/getallusers')}><span style={{color: "white"}}>Show All Users</span></button>}
              <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/gettasks') }}><span style={{color: "white"}}>List Tasks</span></button>
              <button className="crtTasks nav-item nav-link" onClick={(e) => { navigate('/create/task') }}><span style={{color: "white"}}>Create Task</span></button>
            </div>
            <div>
              <button className="logout nav-item nav-link align-self-end" onClick={(e) => loggedout(e)}><span style={{color: "white"}}>Logout</span></button>
            </div>
          </div>
          {/* </div> */}
        </nav>
      </div>
      <div style={profstyle}>
        <div className="item">
          <img className="dashboard" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
        </div>
        <div className="box">
          {want_to_edit ? <p>Name: {user.name}</p> : <input style={{width: "15%", height: "35px"}}type="text" onChange={(e) => { e.preventDefault(); const userName = e.target.value; setname(userName); }} placeholder="Enter your new Name" value={username}></input>}
          <p>Email :  {user.email} </p>
          <p>Email verified at: {user.email_verified_at}</p>
          {/* <p>Role: {user.role}</p> */}
          {/* <p>User ID: {user.userid}</p> */}
        </div>
        <div className="btn-group boxz">
          {want_to_edit ? <button style={xstyle} onClick={(e) => {
            e.preventDefault();
            setwant_to_edit(!want_to_edit)
          }} >Edit</button> : <button style={xstyle} onClick={(e) => {
            e.preventDefault();
            setwant_to_edit(!want_to_edit)
          }} >Back</button>}
          {want_to_edit ? <button style={xstyle} className="passwordchangebtn" onClick={() => {
            navigate('/password/change')
          }} >Change Password</button> : <button style={xstyle} onClick={clickfnfn}>Save</button>}
        </div>
      </div>
      <button className="del" onClick={deleteacc}>Delete Your Account</button>
    </div>
  )
}
export default Dashboard;
