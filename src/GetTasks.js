import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { login } from "./features/userSlice";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function GetTasks({ itemsPerPage }) {
  const axios = require('axios');
  const [js, setjs] = useState([]);
  const [val, setval] = useState('');
  const [pending, setPending] = useState(13);
  const [overdue, setOverdue] = useState(1);
  const [finished, setFinished] = useState(1);
  const [inprogress, setInprogress] = useState(1);
  const user = useSelector(selectUser);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedout = (e) => {
    dispatch(logout());
    navigate('/login');
  };
  useEffect(() => {
    axios.get(user.role == 1 ? 'http://localhost:8000/tasks' : 'http://localhost:8000/utasks/' + user.userid, {
      headers:
      {
        'Authorization': "Bearer " + user.verifytoken
      }
    })
      .then(function (response) {
        // console.log("response received");
        console.log(response.data);
        setjs(response.data);
      })
  }, []);
  const handleStatus = (e, id) => {
    console.log(e.target.value);
    switch(e.target.value){
      case "inprogress":
        setInprogress(inprogress+1);
        break;
        case "overdue":
        setOverdue(overdue+1);
        break;
        case "finished":
        setFinished(finished+1);
        break;
    }




    axios.post('http://localhost:8000/tasks/' + id, {
      headers:
      {
        'Authorization': "Bearer " + user.verifytoken
      },
      params:
      {
        status: e.target.value
      }
    })
      .then(function (response) {
        console.log(response.data);
        // setjs(Object.values(response.data));
      })
  }
  let ss = {
    width: "170px"
  };
  let cs = {
    display: "flex"
  };
  let ws = {
    width: "80px"
  };
  let ts = {
    width: "130px",
    position: "relative",
    left: "40px"
  };
  let zz = {
    width: "90%",
    position: "relative",
    left: "50px"
  };
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Assigned by Admin'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Pending',
        y: pending,
        sliced: true,
        selected: true
      },{
        name: 'Overdue',
        y: overdue
      }, {
        name: 'Finished',
        y: finished
      }, {
        name: 'In Progress',
        y: inprogress
      }]
    }]
  }
  const options2 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Assigned by Self'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Pending',
        y: pending,
        sliced: true,
        selected: true
      },{
        name: 'Overdue',
        y: overdue
      }, {
        name: 'Finished',
        y: finished
      }, {
        name: 'In Progress',
        y: inprogress
      }]
    }]
  }


  return (
    <div>
      <div className='navbary'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
          <a className="navbar-brand" href="#"><em>&nbsp;&nbsp;DeMock</em></a>
          <div className="d-flex navbar-nav container-fluid">
            <div className='d-flex'>
              <button className="myTasks nav-item nav-link" onClick={(e) => { navigate('/dashboard') }}><span style={{ color: "white" }}>Dashboard</span></button>
              {user.role == 1 && <button className="allUsers nav-item nav-link active" onClick={(e) => navigate('/getallusers')}><span style={{ color: "white" }}>Show All Users</span></button>}
              <p className="dis disabled" style={{ color: "white" }}>List Tasks</p>
              <button className="crtTasks nav-item nav-link" onClick={(e) => { navigate('/create/task') }}><span style={{ color: "white" }}>Create Task</span></button>
            </div>
            <div>
              <button className="logout nav-item nav-link align-self-end" onClick={(e) => loggedout(e)}><span style={{ color: "white" }}>Logout</span></button>
            </div>
          </div>
          {/* </div> */}
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "flexStart" }}>
        <div style={{ width: "100%" }}> <HighchartsReact
          highcharts={Highcharts}
          options={options}
        /></div>
        <div style={{ width: "100%" }}> <HighchartsReact
          highcharts={Highcharts}
          options={options2}
        /></div>
      </div>




      <div style={zz}>
        {user.role == 1 ? <h1>Everyone's Tasks</h1> : <h1>{user.name}'s tasks </h1>}
        {<h1>Your ID: {user.userid}</h1>}
        <div style={cs}>
          <select style={ss} class="form-select" aria-label="Default select example">
            <option selected>Sort by</option>
            <option value="1">Title</option>
            <option value="2">Description</option>
            <option value="3">Due Date</option>
          </select>
          <select style={ss} class="form-select" aria-label="Default select example">
            <option selected>Apply filter</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>



        {/* {console.log(response)} */}

        <input className='search' onChange={(e) => { e.preventDefault(); const finalval = e.target.value; setval(finalval); }} type="text" placeholder="Search" value={val} />
        <table>
          <tr>
            <td>Title </td>
            <td>Description</td>
            <td>Assigner</td>
            <td>Assignee</td>
            <td>Status</td>
            <td>Due Date</td>
            <td></td>
            <td></td>
          </tr>
          {js.filter(post => {
            if (val === '') {
              return post;
            } else if (post.title.toLowerCase().includes(val.toLowerCase())) {
              return post;
            }
            else if (post.description.toLowerCase().includes(val.toLowerCase())) {
              return post;
            }
            else if (post.creator.toLowerCase().includes(val.toLowerCase())) {
              return post;
            }
            else if (post.assignee.toLowerCase().includes(val.toLowerCase())) {
              return post;
            }
            else if (post.status.toLowerCase().includes(val.toLowerCase())) {
              return post;
            }
            else if (post.due_date.toLowerCase().includes(val.toLowerCase())) {
              return post;
            }
          }).map((item) => {
            return (
              <tr key={item.id}>
                <th>{item.title}</th>
                <th>{item.description}</th>
                <th>{item.creator}</th>
                <th>{item.assignee}</th>
                <th>{user.userid == item.assignee ?
                  <select onChange={(e) => handleStatus(e, item.id)} style={ts} class="form-select" aria-label="Default select example">
                    <option selected>pending</option>
                    <option value="finished">finished</option>
                    <option value="inprogress">in progress</option>
                    <option value="overdue">overdue</option>
                  </select>
                  : item.status}</th>
                <th>{item.due_date}</th>
                <th>{<button style={ws} type="button" class={user.userid == item.creator ? "btn btn-primary" : "btn btn-primary disabled"}>Edit</button>}</th>
                <th>{<button style={ws} type="button" class={user.userid == item.creator ? "btn btn-danger" : "btn btn-danger disabled"}>Delete</button>}</th>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default GetTasks;
