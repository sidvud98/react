import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";


import ReactDOM from 'react-dom';
// import ReactPaginate from 'react-paginate';

function GetUsers({ itemsPerPage }) {
  const axios = require('axios');
  const [js, setjs] = useState([]);
  const [val, setval] = useState('');
  const [sortMethod, setSortMethod] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  let navigate = useNavigate();
  const loggedout = (e) => {
    dispatch(logout());
    navigate('/login');
  };
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    axios.get('http://localhost:8000/api/users', {
      headers:
      {
        'Authorization': "Bearer " + user.verifytoken
      }
    })
      .then(function (response) {
        // console.log(response.data);
        setjs(response.data);
      })
  }, []);

  const handleSort = (e) => {
    setSortMethod(e.target.value);
    console.log(e.target.value);
    axios.get('http://localhost:8000/api/users', {
      headers:
      {
        'Authorization': "Bearer " + user.verifytoken
      },
      params:
      {
        sort: e.target.value
      }
    })
      .then(function (response) {
        console.log(response.data);
        setjs(Object.values(response.data));
      })
  }
  const handleFilter = (e) => {
    setFilterMethod(e.target.value);
    console.log(e.target.value);
    axios.get('http://localhost:8000/api/users', {
      headers:
      {
        'Authorization': "Bearer " + user.verifytoken
      },
      params:
      {
        filter: e.target.value
      }
    })
      .then(function (response) {
        console.log(response.data);
        setjs(Object.values(response.data));
      })
  }
  const handleClick = (e, id) => {
    axios.delete('http://localhost:8000/api/users/' + id, {
      headers:
      {
        'Authorization': "Bearer " + user.verifytoken
      }
    })
      .then(function (response) {
        console.log("deletd");
        
      });
}


let ss = {
  width: "170px"
};
let cs = {
  display: "flex"
};
let as = {
  borderRadius: "100%",
  width: "40px",
  // textAlign: "center"
};


return (
  <div>
    <div className='navbary'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
        <a className="navbar-brand" href="#"><em>&nbsp;&nbsp;DeMock</em></a>
        <div className="d-flex navbar-nav container-fluid">
          <div className='d-flex'>
            <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/dashboard') }}><span style={{ color: "white" }}>Dashboard</span></button>
            {user.role == 1 && <p className="dis disabled" style={{ color: "white" }}>Show All Users</p>}
            <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/gettasks') }}><span style={{ color: "white" }}>List Tasks</span></button>
            <button className="crtTasks nav-item nav-link" onClick={(e) => { navigate('/create/task') }}><span style={{ color: "white" }}>Create Task</span></button>
          </div>
          <div>
            <button className="logout nav-item nav-link align-self-end" onClick={(e) => loggedout(e)}><span style={{ color: "white" }}>Logout</span></button>
          </div>
        </div>
        {/* </div> */}
      </nav>
    </div>

    <div style={cs}>
      <select style={ss} className="form-select" aria-label="Default select example" onChange={(e) => handleSort(e)}>
        <option defaultValue>Sort by</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="id">ID</option>
      </select>
      <select style={ss} className="form-select" aria-label="Default select example" onChange={(e) => handleFilter(e)}>
        <option defaultValue>Filter by</option>
        <option value="admin">Admin</option>
        <option value="normal">Normal</option>
      </select>
    </div>






    <input className='search' onChange={(e) => { e.preventDefault(); const finalval = e.target.value; setval(finalval); }} type="text" placeholder="Search" value={val} />
    <table>
      <tr>
        <td>Id</td>
        <td>Name </td>
        <td>Email</td>
        <td>Role</td>
        <td>Assign Task</td>
        <td>Action</td>
      </tr>
      {js.filter(post => {

        if (val === '') {
          return post;
        } else if (post.name.toLowerCase().includes(val.toLowerCase())) {
          return post;
        }
        else if (post.email.toLowerCase().includes(val.toLowerCase())) {
          return post;
        }
        // else if (post.role.toLowerCase().includes(val.toLowerCase())) {
        //   return post;
        // }
      }).map((item) => {
        return (
          <tr key={item.id}>
            <th>{item.id}</th>
            <th>{item.name} </th>
            <th>{item.email}</th>
            <th>{item.role == 1 ? "Admin" : "Normal"}</th>
            <th>{<button style={as} type="button" className="btn btn-light">+</button>}</th>
            <th>{<button type="button" className="btn btn-danger" onClick={(e) => { handleClick(e, item.id) }}>Delete</button>}</th>
          </tr>
        )
      })}
    </table>
  </div>
)
}

export default GetUsers;

