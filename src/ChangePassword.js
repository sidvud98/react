import React, { Component }  from 'react';
import "./styles.css";
import {useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { selectUser } from "./features/userSlice";

function ChangePassword() {
    let navigate = useNavigate();
    const [oldpassword,setoldpasword]=useState('');
    const [newpassword,setnewpasword]=useState('');
    const [newconfpassword,setnewconfpassword]=useState('');
    const user = useSelector(selectUser);
    function clickfn(e){
        e.preventDefault();
        if(oldpassword===newpassword){alert('Your new password should be different from old password');}
        else if(newconfpassword!==newpassword) {alert("New Passwords should match");}
        else{
            axios.post('http://localhost:8000/password/change',{
                password:oldpassword,
                new_password:newpassword
            },{headers:
                {
                    'Authorization':"Bearer"+ user.verifytoken
                }})
            .then(function (response){
                if(response.data[0]==='Your password has been successfully changed'){
                    alert("Your password has been changed.");
                    navigate('/login');
                }
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.data[0]==='Incorrect current password'){
                        alert("Old Password is incorrect");
                    }
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
    }
    let xstylec = {
        borderRadius: "8px"
    };
    let xstyler = {
        backgroundColor: "red",
        borderRadius: "8px"
    };
    return (<div>
        <h1>Change Password</h1>
        <form onSubmit={clickfn}>
        <input style={xstylec} onChange={(e)=>{e.preventDefault();const oldPassword=e.target.value;setoldpasword(oldPassword);}} type="password" placeholder="Current Password" value={oldpassword} required></input>
        <input style={xstylec} onChange={(e)=>{e.preventDefault();const newPassword=e.target.value;setnewpasword(newPassword);}} type="password" placeholder="New Password" value={newpassword} required></input>
        <label>Re-enter your new password</label>
        <input style={xstylec} onChange={(e)=>{e.preventDefault();const newconfpassword=e.target.value;setnewconfpassword(newconfpassword);}} type="password" placeholder="New Password" value={newconfpassword} required></input>
        <button style={xstylec} type="submit">Change</button>
        <button style={xstyler} onClick={()=>navigate('/dashboard')} >Cancel</button>
        </form>
        
         </div>
    )
}
export default ChangePassword