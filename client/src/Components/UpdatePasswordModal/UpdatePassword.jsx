import { Button } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import Header from '../Header/Header';
import swal from 'sweetalert';
import './update.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
const UpdatePassword = () => {
    const {user,dispatch} = useContext(AuthContext);
    const [credentials,setCredentials]= useState({
        password:undefined,
        confirmPassword:undefined
    });
    const handlechange=(e)=>{
        e.preventDefault();
        setCredentials((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
 
    
    const handleUpdate=async()=>{
       
            if(credentials.password!==credentials.confirmPassword){
                swal({
                    title:"Passwords",
                    text:"Password and Confirm password are not matching",
                    icon:'warning'

                })
            }
             if(user?.password===credentials.password){
                swal({
                    title:"Duplicate passwords",
                    text:"Please do not enter your old password",
                    icon:'warning'

                })
                
            }
            if(credentials.password===credentials.confirmPassword &&user?.password!==credentials.password ){
                try {
                    await axios.put(`/auth/update/${user?.employeeCode}`,{credentials});
                    swal({
                        title:"Success",
                        text:"Password updated SuccessFully",
                        icon:'success',
                        
    
    
                    });
                    dispatch({type:'LOGOUT'});
                } catch (error) {
                    swal({
                        title:"Error",
                        text:"Something went Wrong",
                        icon:'error',
                        
    
    
                    });
                }
            }

    }
    console.log(credentials);
  return (
    <div className='updateBody'>
        <Header addEmp={true} list={true} logged={true}/>
        <div className='updatePassContainer'>
            <div className="leftUpdatepass">
            <img src='/password.svg' alt="password"/>
            </div>
            <div className="rightUpdatepass">
                <p>Update password</p>
                <form>
                    <input type="password" name="password" placeholder='Enter new Password' onChange={handlechange}/>
                    <input type="text" name="confirmPassword" placeholder='Confirm New Password' onChange={handlechange} /> 
                    <Button size='small' style={{width:'50%', alignSelf:'center',marginTop:'10px'}} variant='contained' onClick={handleUpdate}>Update</Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdatePassword