import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { login } from "./features/userSlice";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment';
import Navbar from './navbar';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


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
  let token = JSON.parse(localStorage.getItem('user')).access_token;
  console.log("token is " + token);
  let uname = JSON.parse(localStorage.getItem('user')).user.name;
  console.log("name is " + uname);
  let userid = JSON.parse(localStorage.getItem('user')).user.id;
  console.log("userid is " + userid);
  let eva = JSON.parse(localStorage.getItem('user')).user.email_verified_at;
  console.log("eva is " + eva);
  let role = JSON.parse(localStorage.getItem('user')).user.role;
  console.log("role is " + role);
  let mail = JSON.parse(localStorage.getItem('user')).user.email;
  console.log("mail is " + mail);
  window.Pusher = require('pusher-js');
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '055d68079c020531ceb3',
    cluster: 'mt1',
    forceTLS: true
  });
  useEffect(() => {
    // console.log(user);
    // console.log("&&&&&&&&&&&&");
    // window.Echo.private("task".user.name)
    //   .listen("TaskEvent", (data) => {
    //     alert("A task named "+ data.title+" is created by admin")

    //   });
    // Pusher.logToConsole = true;

    // var pusher = new Pusher('055d68079c020531ceb3', {
    //   cluster: 'mt1'
    // });

    // var channel = pusher.subscribe('my-channel');
    // channel.bind('my-event', function(data) {
    //   alert(JSON.stringify(data));
    // });

  },[]);
  function deleteacc(e) {
    e.preventDefault();
    axios.delete('http://localhost:8000/api/users/' + userid, {}, {
      headers:
      {
        'Authorization': "Bearer " + token
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
    axios.put('http://localhost:8000/api/users/' + userid, {
      name: username,
    })
      .then(function (response) {
        dispatch(login({
          userid: userid,
          name: username,
          email_verified_at: eva,
          loggedIn: true,
          role: role,
          email: mail
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
      {/* <div className='navbary'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
          <a className="navbar-brand" href="#"><em>&nbsp;&nbsp;Logo</em></a>
          <div className="d-flex navbar-nav container-fluid">
            <div className='d-flex'>
              <p className="dis disabled" style={{ color: "white" }}>Dashboard</p>
              {user.role == 1 && <button className="allUsers nav-item nav-link active" onClick={(e) => navigate('/getallusers')}><span style={{ color: "white" }}>Show All Users</span></button>}
              <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/gettasks') }}><span style={{ color: "white" }}>List Tasks</span></button>
              <button className="crtTasks nav-item nav-link" onClick={(e) => { navigate('/create/task') }}><span style={{ color: "white" }}>Create Task</span></button>
            </div>
            <div>
              <button className="logout nav-item nav-link align-self-end" onClick={(e) => loggedout(e)}><span style={{ color: "white" }}>Logout</span></button>
            </div>
          </div>
        </nav>
      </div> */}
      <Navbar className='navbary' dis="dash" rol={role}/>


      <div style={profstyle}>
        <div className="item">
          <img className="dashboard" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
        </div>
        <div className="box">
          {want_to_edit ? <p>Name: {uname}</p> : <input style={{ width: "15%", height: "35px" }} type="text" onChange={(e) => { e.preventDefault(); const userName = e.target.value; setname(userName); }} placeholder="Enter your new Name" value={username}></input>}
          <p>Email :  {mail} </p>
          <p>Email verified at: {moment(eva).format('MMMM Do YYYY, h:mm:ss a')}</p>
          {/* <p>Role: {user.role}</p> */}
          <p>User ID: {userid}</p>
        </div>
        <div className="btn-group boxz">
          {want_to_edit ? <button style={xstyle} onClick={(e) => {
            e.preventDefault();
            setwant_to_edit(!want_to_edit)
          }} >Edit Name</button> : <button style={xstyle} onClick={(e) => {
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
