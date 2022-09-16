import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Nav from './Nav';
import Register from './Register';
import GetUsers from "./GetUsers";
import EmailVerification from "./EmailVerification";
import EmailVerify from "./EmailVerify";
import Dashboard from "./Dashboard";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import Requestpasswordreset from "./Requestpasswordreset";
import ResetPassword from "./ResetPassword";
import ChangePassword from './ChangePassword';
import CreateTask from './CreateTask';
import CreateUser from './CreateUser';
import GetTasks from './GetTasks';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';






function App() {

  // const user = useSelector(selectUser);

  
  // useEffect(() => {
    
  // }, [user]);
  
  const user = useSelector(selectUser);
  




  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emailverification" element={<EmailVerification />} />
          <Route path="/getallusers" element={<GetUsers />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/requestpasswordreset" element={<Requestpasswordreset />} />
          <Route path="/email/verify" element={<EmailVerify />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/password/change" element={<ChangePassword />} />
          <Route path="/create/task" element={<CreateTask />} />
          <Route path="/create/user" element={<CreateUser />} />
          <Route path="/gettasks" element={<GetTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

