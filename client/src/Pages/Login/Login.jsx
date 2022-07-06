import React, { useContext } from 'react'
import Header from '../../Components/Header/Header';
import  './login.css';
import Person from '@mui/icons-material/Person';
import Lock from '@mui/icons-material/Lock';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/authContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


const Login = () => {
  const {user,loading,error,dispatch}= useContext(AuthContext);
  const[credentials,setCredentials]=useState({
    username:'',
    password:''
  });
  const navigate= useNavigate();
  const handleChange=(e)=>{
    e.preventDefault();
    setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(credentials);
    dispatch({type:'LOGIN_START'});
    try {
        const res= await axios.post("/auth/login",credentials);
        dispatch({type:'LOGIN_SUCCESS', payload:res.data})
        console.log(res.data);
        window.localStorage.setItem("user",JSON.stringify(res.data));
        navigate(`/login/${res.data.employeeCode}`);

    } catch (error) {
      
      dispatch({type:'LOGIN_FAILURE'});
      // console.log(error.response);
      swal({
        title:"Invalid credentials",
        text:"Username and password are invalid",
        icon:'error'
      })
      
    }

  }

  return (
    <div>
        <Header addEmp={true} list={true}/>
        <div className='login'>
            <div className="leftC">
              <img src='/login.svg' alt='login'/>
            </div>
            <div className="rightC">
              <h5 className='signinHeading'>Sign In</h5>
              <form>
                <div className="finput">
                <Person style={{color:'cyan'}}/>
                <input type="text" id="username" placeholder="username" name="username" onChange={handleChange}/>
                </div>
                <div className="finput">
                <Lock style={{color:'cyan'}} />
                <input type="password" id="password" name="password" placeholder="password" onChange={handleChange}/>
                </div>
               <Button style={{width:'20%',margin:'15px auto'}} type="submit" size="small" disabled={loading} variant="contained" onClick={handleSubmit}>Login</Button>

              </form>
            </div>
        </div>
    </div>
  )
}

export default Login;