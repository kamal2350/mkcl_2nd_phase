import React from 'react'
import  './header.css';
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {
  return (
    <div className='container'>
        <div className="left">
            <img  src='/logo192.png' alt='logo'/>
        </div>
        <div className="center">
         <Button variant="contained" endIcon={<AddCircleIcon/>}>Add Employee</Button>
         <Button color='warning' variant ="contained">Employee List</Button>
        </div>
        <div className="right">
            <Button variant='contained' style={{backgroundColor:'lightgreen'}} endIcon={<LoginIcon/>}>Login</Button>
            {/* <Button variant='contained' style={{backgroundColor:'red'}} endIcon={<LogoutIcon/>}>Logout</Button> */}
        </div>
    </div>
  )
}

export default Header