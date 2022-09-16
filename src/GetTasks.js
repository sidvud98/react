import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { login } from "./features/userSlice";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment';
import Navbar from './navbar';


function GetTasks({ itemsPerPage }) {
  const axios = require('axios');
  const [js, setjs] = useState([]);
  const [val, setval] = useState('');
  const [admpending, admsetPending] = useState(1);
  const [pending, setPending] = useState(1);
  const [admoverdue, admsetOverdue] = useState(1);
  const [overdue, setOverdue] = useState(1);
  const [admfinished, admsetFinished] = useState(1);
  const [finished, setFinished] = useState(1);
  const [adminprogress, admsetInprogress] = useState(1);
  const [inprogress, setInprogress] = useState(1);
  const [editBool, seteditBool] = useState(false);
  const [editBoolID, seteditBoolID] = useState(0);
  const [chgTitle, setchgTitle] = useState('');
  const [chgDesc, setchgDesc] = useState('');
  const [sortSt, setsortSt] = useState(null);
  const [filtSt, setfiltSt] = useState(null);
  const [page, setpage] = useState(1);
  const user = useSelector(selectUser);
  const userz = JSON.parse(localStorage.getItem("user"));
  // const [taskAssignee, settaskAssignee] = useState(user.id);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedout = (e) => {
    dispatch(logout());
    navigate('/login');
  };
  let token = JSON.parse(localStorage.getItem('user')).access_token;
  // console.log("token is " + token);
  let role = JSON.parse(localStorage.getItem('user')).user.role;
  // console.log("role is " + role);
  let userid = JSON.parse(localStorage.getItem('user')).user.id;
  // console.log("userid is " + userid);
  let name = JSON.parse(localStorage.getItem('user')).user.name;
  // console.log("name is " + name);

  useEffect(() => {
    // axios.get(role == 1 ? 'http://localhost:8000/tasks/' : 'http://localhost:8000/utasks/' + userid, {
    axios.get(role == 1 ? 'http://localhost:8000/tasks?page=' + page: 'http://localhost:8000/utasks' + userid + "?page=" + page, {
      headers:
      {
        // 'Authorization': "Bearer " + user.access_tokenverifytoken
        'Authorization': "Bearer " + token
      }
    })
      .then(function (response) {
        // console.log(response.data);
        setjs(response.data.data);
        counterFunc(response.data.data);
      })
  }, []);

  const handleStatus = (e, id) => {

    axios.post('http://localhost:8000/tasks/' + id, {
      headers:
      {
        'Authorization': "Bearer " + token
      },
      // params:
      // {
      //   status: e.target.value
      // }
      status: e.target.value,
    })
      .then(function (response) {
        // console.log(response.data);
        // setjs(Object.values(response.data));
        //----------------------------------------------------------------------------------------
        axios.get(role == 1 ? 'http://localhost:8000/tasks' : 'http://localhost:8000/utasks/' + userid, {
          headers:
          {
            'Authorization': "Bearer " + token
          }
        })
          .then(function (response) {
            // console.log("response received");
            setjs(response.data);
            counterFunc(response.data);
          })
        //----------------------------------------------------------------------------------------
      })
  }
  const handlePage = () => {
    // console.log(page)
    axios.get(role == 1 ? 'http://localhost:8000/tasks?page=' + page : 'http://localhost:8000/utasks' + userid + "?page=" + page, {
      headers:
      {
        // 'Authorization': "Bearer " + user.access_tokenverifytoken
        'Authorization': "Bearer " + token
      }
    })
      .then(function (response) {
        // console.log("page response: " + response.data.data);
        setjs(response.data.data);
        counterFunc(response.data.data);
      })
  }
  const delFunc = (id) => {
    axios.delete('http://localhost:8000/tasks/' + id, {
      headers:
      {
        'Authorization': "Bearer " + token
      },
    })
      .then(function (response) {
        // console.log(response.data);
        // setjs(Object.values(response.data));
        alert('Task has been successfully deleted');
        //----------------------------------------------------------------------------------------
        axios.get(role == 1 ? 'http://localhost:8000/tasks' : 'http://localhost:8000/utasks/' + userid, {
          headers:
          {
            'Authorization': "Bearer " + token
          }
        })
          .then(function (response) {
            // console.log("response received");
            setjs(response.data);
            counterFunc(response.data);
          })
        //----------------------------------------------------------------------------------------
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
    // left: "0px"
  };
  let zz = {
    width: "100%",
    position: "relative",
    // left: "50px"
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
        y: admpending,
        sliced: true,
        selected: true
      }, {
        name: 'Overdue',
        y: admoverdue
      }, {
        name: 'Finished',
        y: admfinished
      }, {
        name: 'In Progress',
        y: adminprogress
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
      }, {
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

  const counterFunc = (js) => {
    let sp = 0, sf = 0, si = 0, so = 0;
    let asp = 0, asf = 0, asi = 0, aso = 0;
    js.map((item) => {
      if (item.creator == userid) {
        switch (item.status) {
          case "pending":
            sp += 1;
            break;
          case "finished":
            sf += 1;
            break;
          case "inprogress":
            si += 1;
            break;
          case "overdue":
            so += 1;
            break;
        }
      }
      else {
        switch (item.status) {
          case "pending":
            asp += 1;
            break;
          case "finished":
            asf += 1;
            break;
          case "inprogress":
            asi += 1;
            break;
          case "overdue":
            aso += 1;
            break;
        }
      }
    });
    setPending(sp);
    setOverdue(so);
    setFinished(sf);
    setInprogress(si);
    admsetPending(asp);
    admsetOverdue(aso);
    admsetFinished(asf);
    admsetInprogress(asi);
  }

  const handleSort = (e) => {
    // console.log(e.target.value);
    axios.get(role == 1 ? 'http://localhost:8000/tasks' : 'http://localhost:8000/utasks/' + userid, {
      headers:
      {
        'Authorization': "Bearer " + token
      },
      params:
      {
        sort: e,
        filterStatus: filtSt
      }
    })
      .then(function (response) {
        // setjs(Object.values(response.data));
        setjs(response.data);
        // console.log(response.data);
      })
  }
  const handleFilterStatus = (e) => {
    // console.log(e.target.value);
    axios.get(role == 1 ? 'http://localhost:8000/tasks' : 'http://localhost:8000/utasks/' + userid, {
      headers:
      {
        'Authorization': "Bearer " + token
      },
      params:
      {
        sort: sortSt,
        filterStatus: e
      }
    })
      .then(function (response) {
        // console.log(response.data);
        // setjs(Object.values(response.data));
        setjs(response.data);
      })
  }
  const editFunc = (id, titley, desc) => {
    // console.log(titley);
    axios.post('http://localhost:8000/tasks/' + id, {
      headers:
      {
        'Authorization': "Bearer " + token
      },
      // params:
      // {
      //   status: e.target.value
      // }
      title: titley,
      description: desc
    })
      .then(function (response) {
        // console.log(response.data);
        // setjs(Object.values(response.data));
        //----------------------------------------------------------------------------------------
        axios.get(role == 1 ? 'http://localhost:8000/tasks' : 'http://localhost:8000/utasks/' + userid, {
          headers:
          {
            'Authorization': "Bearer " + token
          }
        })
          .then(function (response) {
            // console.log("response received");
            setjs(response.data);
            counterFunc(response.data);
          })
        //----------------------------------------------------------------------------------------
      })
  }

  // return null

  return (
    <div>


      <Navbar className='navbary' dis="lt" rol={role} />



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
        {role == 1 ? <h1>Everyone's Tasks</h1> : <h1>{name}'s tasks </h1>}
        {<h1>Your ID: {userid}</h1>}
        <div style={cs}>
          <select style={ss} className="form-select" aria-label="Default select example" onChange={(e) => { setsortSt(e.target.value); handleSort(e.target.value); }}>
            <option selected>Sort by: None</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="due_date">Due Date</option>
          </select>
          <select style={ss} className="form-select" aria-label="Default select example" onChange={(e) => { setfiltSt(e.target.value); handleFilterStatus(e.target.value); }}>
            <option selected>Filter by: None</option>
            <option value="overdue">Overdue</option>
            <option value="inprogress">In Progress</option>
            <option value="finished">Finished</option>
            <option value="pending">Pending</option>
          </select>
        </div>



        {/* {console.log(response)} */}

        <input className='search' onChange={(e) => { e.preventDefault(); const finalval = e.target.value; setval(finalval); }} type="text" placeholder="Search" value={val} />
        <table>
          <thead>
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
          </thead>
          {js != null && js.filter(post => {
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
            // else if (post.due_date.toLowerCase().includes(val.toLowerCase())) {
            //   return post;
            // }
          }).map((item) => {
            return (
              <tbody key={item.id}>
                <tr key={item.id}>
                  <th>{(item.id == editBoolID) && editBool ?
                    <input onChange={(e) => { e.preventDefault(); const ct = e.target.value; setchgTitle(ct); }} type="text" value={chgTitle == '' ? item.title : chgTitle}></input>
                    : item.title
                  }</th>
                  <th>{(item.id == editBoolID) && editBool ?
                    <input onChange={(e) => { e.preventDefault(); const cd = e.target.value; setchgDesc(cd); }} type="text" value={chgDesc == '' ? item.description : chgDesc}></input>
                    : item.description
                  }</th>

                  {/* <th>{item.description}</th> */}
                  <th>{item.creator}</th>
                  <th>{item.assignee}</th>
                  <th>{userid == item.assignee ?
                    <select value={item.status} onChange={(e) => handleStatus(e, item.id)} style={ts} className="form-select" aria-label="Default select example">
                      <option value="pending" selected={false}>pending</option>
                      <option value="finished">finished</option>
                      <option value="inprogress">in progress</option>
                      <option value="overdue">overdue</option>
                    </select>
                    : item.status}</th>
                  <th>{moment(item.due_date).format('MMMM Do YYYY, h:mm:ss a')}</th>
                  <th>{(item.id == editBoolID) && editBool ?
                    <button style={ws} onClick={() => { seteditBool(!editBool); seteditBoolID(item.id); editFunc(item.id, (chgTitle == '' ? item.title : chgTitle), (chgDesc == '' ? item.description : chgDesc)); setchgTitle(''); setchgDesc(''); }} type="button" className="btn btn-primary">Save</button>
                    : <button style={ws} type="button" onClick={() => { seteditBool(!editBool); seteditBoolID(item.id); }} className={userid == item.creator ? "btn btn-primary" : "btn btn-primary disabled"}>Edit</button>
                  }</th>
                  <th>{(item.id == editBoolID) && editBool ?
                    <button style={ws} onClick={() => { seteditBool(!editBool); seteditBoolID(item.id); }} type="button" className="btn btn-danger">Cancel</button>
                    : <button style={ws} type="button" onClick={() => { seteditBool(!editBool); seteditBoolID(0); delFunc(item.id); }} className={userid == item.creator ? "btn btn-danger" : "btn btn-danger disabled"}>Delete</button>
                  }</th>
                </tr>
              </tbody>
            )
          })}
        </table>

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" onClick={()=>{setpage(page-1); handlePage();}}>Previous</a></li>
            <li className="page-item"><p>Page: {page}</p></li>
            <li className="page-item"><a className="page-link" onClick={()=>{setpage(page+1); handlePage();}}>Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default GetTasks;
