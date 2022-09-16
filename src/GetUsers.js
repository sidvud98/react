import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';


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
  const token = localStorage.getItem('user').access_token;
  let role = JSON.parse(localStorage.getItem('user')).user.role;

  useEffect(() => {
    axios.get('http://localhost:8000/api/users', {
      headers:
      {
        'Authorization': "Bearer " + token
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
        'Authorization': "Bearer " + token
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
        'Authorization': "Bearer " + token
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
        'Authorization': "Bearer " + token
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
  let ts = {
    width: "70%",
    position: "relative",
    left: "200px"
  };

  // if(loading)
  // return <div>loading...</div>

  return (
    <div>
      <Navbar className='navbary' dis="sau" rol={role}/>
      <div style={ts}>
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
          <thead>
          <tr>
            <td>Id</td>
            <td>Name </td>
            <td>Email</td>
            <td>Role</td>
            {/* <td>Assign Task</td> */}
            <td>Action</td>
          </tr>
          </thead>
          {js.filter(post => {

            if (val === '') {
              return post;
            } else if (post.name.toLowerCase().includes(val.toLowerCase())) {
              return post;
            }
            else if (post.email.toLowerCase().includes(val.toLowerCase())) {
              return post;
            }
          }).map((item) => {
            return (
              <tbody key={item.id}>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name} </td>
                <td>{item.email}</td>
                <td>{item.role == 1 ? "Admin" : "Normal"}</td>
                {/* <td>{<button style={as} type="button" className="btn btn-light">+</button>}</td> */}
                <td>{<button type="button" className="btn btn-danger" onClick={(e) => { handleClick(e, item.id) }}>Delete</button>}</td>
              </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default GetUsers;

