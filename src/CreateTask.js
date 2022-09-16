import React, { Component } from 'react';
import "./styles.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';




function CreateTask() {
    const [taskTitle, settaskTitle] = useState('')
    const [taskDescription, settaskDescription] = useState('');
    const [date_value, setdate_value] = useState(new Date());
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const loggedout = (e) => {
        dispatch(logout());
        navigate('/login');
    };
    let token = JSON.parse(localStorage.getItem('user')).access_token;
    console.log("token is " + token);
    let role = JSON.parse(localStorage.getItem('user')).user.role;
    console.log("role is " + role);
    let userid = JSON.parse(localStorage.getItem('user')).user.id;
    console.log("userid is " + userid);
    let name = JSON.parse(localStorage.getItem('user')).user.name;
    console.log("name is " + name);
    const [taskAssignee, settaskAssignee] = useState();
    function clickfn(e) {
        e.preventDefault();
        // console.log({
        //     title: taskTitle,
        //     description: taskDescription,
        //     assignee: (taskAssignee),
        //     creator: (userid),
        //     due_date: date_value,
        //     // created_by: user.userid
        // });
        axios.post('http://localhost:8000/tasks/create', {
            title: taskTitle,
            description: taskDescription,
            assignee: (taskAssignee),
            creator: (userid),
            due_date: date_value,
            // created_by: user.userid
        }, {
            headers:
            {
                'Authorization': "Bearer " + token
            }
        })
            .then(function (response) {

                alert("Task Created Succesfully");
                navigate("/gettasks");
            })
            .catch((error) => {

                if (error.response) {
                    if (error.response.data.error);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }

            });
    }
    let xstyle = {
        borderRadius: "8px",
    };
    let zstyle = {
        borderRadius: "8px",
        margin: "10px"
    };
    let formstyle = {
        width: "40%",
        position: "relative",
        left: "450px",
        top: "80px"
    };
    return (
        <div>
            {/* <div className='navbary'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
                    <a className="navbar-brand" href="#"><em>&nbsp;&nbsp;Logo</em></a>
                    <div className="d-flex navbar-nav container-fluid">
                        <div className='d-flex'>
                            <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/dashboard') }}><span style={{ color: "white" }}>Dashboard</span></button>
                            {user.role == 1 && <button className="allUsers nav-item nav-link active" onClick={(e) => navigate('/getallusers')}><span style={{ color: "white" }}>Show All Users</span></button>}
                            <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/gettasks') }}><span style={{color: "white"}}>List Tasks</span></button>
                            <p className="dis disabled" style={{ color: "white" }}>Create Task</p>
                        </div>
                        <div>
                            <button className="logout nav-item nav-link align-self-end" onClick={(e) => loggedout(e)}><span style={{ color: "white" }}>Logout</span></button>
                        </div>
                    </div>
                </nav>
            </div> */}
            <Navbar className='navbary' dis="ct" rol={role}/>
            <div style={formstyle}>
                <form onSubmit={clickfn}>
                    <label><b>Title </b></label>
                    <input style={xstyle} onChange={(e) => { e.preventDefault(); const taskTitle = e.target.value; settaskTitle(taskTitle); }} placeholder="Title of the Task" type="text" required />

                    <label><b>Description </b></label>
                    <input style={xstyle} onChange={(e) => { e.preventDefault(); const taskDescription = e.target.value; settaskDescription(taskDescription); }} type="text" placeholder="Description of the Task" required />

                    <label><b>Assignee</b></label>
                    <input style={xstyle} onChange={(e) => { e.preventDefault(); const taskAssignee = e.target.value; settaskAssignee(taskAssignee); }} type="text" placeholder="Assignee" required />
                    <label><b>Due Date &nbsp;</b></label>


                    <input onChange={(e) => { e.preventDefault(); const newdateval = e.target.value; setdate_value(newdateval); }} type="date" id="duedate" name="duedate" />
                    <button style={zstyle} type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}
export default CreateTask;