import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


function Navbar(props) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    const loggedout = (e) => {
      localStorage.removeItem('user');
      dispatch(logout());
      navigate('/login');
    };
    // const role = localStorage.getItem('user').role;
    // return null
    // console.log("role is " + props.rol);
    return(
        <div className='navbary'>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
            <a className="navbar-brand" href="#"><em>&nbsp;&nbsp;Logo</em></a>
            <div className="d-flex navbar-nav container-fluid">
              <div className='d-flex'>
                {props.dis == "dash" ? <p className="dis disabled" style={{ color: "white" }}>Dashboard</p> : <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/dashboard') }}><span style={{ color: "white" }}>Dashboard</span></button>}
                {props.rol == 2 ? <p></p> : 
                props.dis == "sau" ? <p className="dis disabled" style={{ color: "white" }}>Show All Users</p> : <button className="allUsers nav-item nav-link active" onClick={(e) => navigate('/getallusers')}><span style={{ color: "white" }}>Show All Users</span></button>}
                {props.dis == "lt" ? <p className="dis disabled" style={{ color: "white" }}>List Tasks</p> : <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/gettasks') }}><span style={{ color: "white" }}>List Tasks</span></button>}
                {props.rol == 2 ? <p></p> : 
                props.dis == "cu" ? <p className="dis disabled" style={{ color: "white" }}>Create User</p> : <button className="crtTasks nav-item nav-link" onClick={(e) => { navigate('/create/user') }}><span style={{ color: "white" }}>Create User</span></button>}
                {props.dis == "ct" ? <p className="dis disabled" style={{ color: "white" }}>Create Task</p> : <button className="crtTasks nav-item nav-link" onClick={(e) => { navigate('/create/task') }}><span style={{ color: "white" }}>Create Task</span></button>}
              </div>
              <div>
                <button className="logout nav-item nav-link align-self-end" onClick={(e) => loggedout(e)}><span style={{ color: "white" }}>Logout</span></button>
              </div>
            </div>
            {/* </div> */}
          </nav>
        </div>

    );
}
export default Navbar;
  