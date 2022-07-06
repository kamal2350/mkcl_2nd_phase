import React, { useContext } from 'react'
import  './header.css';
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import cookie from 'cookie';
import axios from 'axios';

const Header = ({addEmp,list,logged}) => {
  const {user,dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut=async()=>{
    
    try {
      dispatch({type:'LOGOUT'});
      await axios.get('/auth/logout');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    cookie.remove('access_token');
    

  }

  return (
    <div className='container'>
        <div className="left">
            <img  src='/logo192.png' alt='logo'/>
        </div>

        {/* center  */}
        <div className="center">
         {addEmp &&
          <Link to={"/register"} style={{textDecoration:'none'}}>
            <Button size='small' style={{backgroundColor:'#6df283',fontSize:'12px'}}  variant="contained" endIcon={<AddCircleIcon/>}>
              Add Employee
            </Button>
          </Link>
         }
        {list && 
          <Link to ={"/employees"} style={{textDecoration:'none' }} >
            <Button size='small' style={{backgroundColor:'#ab72ed',fontSize:'12px'}} className='btnHeader' variant ="contained" endIcon={<ListIcon/>}>
              Employee List
            </Button>
          </Link>}
        
        </div>

        {/* right */}
        <div className="right">
        {user && 
        <Link to ={`/login/${user.employeeCode}`}  style={{textDecoration:'none'}}  >
          <Button style={{backgroundColor:'#58c6f5',fontSize:'12px'}}  size='small' variant ="contained">DashBoard</Button>
        </Link>
        }
        { user? 
        <Button variant='contained' size="small"  style={{backgroundColor:'#f76045',fontSize:'12px'}} endIcon={<LogoutIcon/>} onClick={handleLogOut} >
          Logout
        </Button>:
        <Link to={'/login'} style={{textDecoration:'none',  marginLeft:'10px'}}>
          <Button variant='contained'size='small' style={{backgroundColor:'#55e4fa',fontSize:'12px'}} endIcon={<LoginIcon/>}>
            Login
          </Button>
        </Link>
        }
        </div>
    </div>
  )
}

export default Header