import { Button } from '@mui/material'
import React from 'react'
import swal from 'sweetalert';
import { useState } from 'react'
import './registerform.css'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
const RegisterForm = ({name}) => {
  const navigate= useNavigate();
  const {state} = useLocation();
  console.log(state);
  
  const [credentials,setCredentials]= useState({
    firstname:state?state.firstname :undefined,
    lastname:state?state.lastname:undefined,
    dateOfBirth:state?state.dateOfBirth:undefined,
    gender:state?state.gender:undefined,
    mobile:state?state.mobile:undefined,
    email:state?state.email:undefined,
    city:state?state.city:undefined,
    pincode:state?state.pincode:undefined,
    employeeCode:state?state.pincode:undefined,
    username:state?state.username:undefined,
    password:state?state.password:undefined,
    confirmPassword:state?state.password:undefined

  });
  console.log(name);
  const register=async()=>{
    try {
       await axios.post('/auth/register',credentials); 
      swal({
        title:"Registeration success",
        text:"Registeration SuccessFull",
        icon:"success"
      });
      navigate('/login');
    } catch (error) {
      console.log(error.response.data);
     
      const e=error.response.data;
      if(error.response.data.code===11000){
        const key=Object.keys(error.response.data.keyValue);
        swal({
          title:'Duplicate data is not allowed',
          icon:'error',
          text:`${key} value ${Object.values(error.response.data.keyValue)} is not valid `
        })
      
      }
      else{
          // console.log(e.message.split(','));
          const arr=e.message.split(',')[0].split(':');
          console.log(arr);
         
           swal({
             title:'Validation Error',
             text:`${arr}`
           })
       }
 
  }         
  }
  const update=async()=>{
    
    try {
      const res= await axios.put(`/auth/update/${state.employeeCode}`,{credentials});
      console.log(res.data); 
      swal({
        title:"Update Employee",
        text:"Update SuccessFull",
        icon:"success"
      });
      navigate('/employees');
    } catch (error) {
      console.log(error);
      const e=error.response.data;
      if(error.response.data.code===11000){
        const key=Object.keys(error.response.data.keyValue);
        swal({
          title:'Duplicate data is not allowed',
          icon:'error',
          text:`${key} value ${Object.values(error.response.data.keyValue)} is not valid `
        })
      
      }
      else{
          // console.log(e.message.split(','));
          const arr=e.message.split(',')[0].split(':');
          console.log(arr);
         
           swal({
             title:'Validation Error',
             text:`${arr}`
           })
       }
    }
  }
  function validate(){
    if(credentials.password!==credentials.confirmPassword){
      swal({
        title:"Validation error",
        text:"passwords are not matching",
        icon:"error"
      });
    }
    else{
     name==="update"?update():register();
    }
  
    
    
    
    
    }
  const handleChange=(e)=>{
    e.preventDefault();
    setCredentials((prev)=>({...prev,[e.target.name]:e.target.value}));
  }
  console.log(credentials);
  return (
    <div className='registerForm'>
      <div className="formContainer">
        <form className='form'>
          <div className="input">
          <label>Enter your First Name</label>
            <input type="text" name="firstname"placeholder='Firstname' defaultValue={state && state.firstname} onChange={handleChange}/>
          </div>
          <div className="input">
          <label>Enter your Last Name</label>
            <input type="text"name='lastname' placeholder='Lastname' defaultValue={state &&state.lastname} onChange={handleChange}/>
          </div>
          <div className="input">
          <label>Enter your Date of Birth</label><br/>
            <input type='date' name ="dateOfBirth" defaultValue={state && state.dateOfBirth} onChange={handleChange}/>
          </div>
          <div className="input" name="gender" >
          <label>Select Your Gender</label><br/>
           <div className='gender'> 
           <label>Male<input type="radio" className='radio' name='gender' defaultChecked={state && state.gender==='male'} value="male" onChange={handleChange}/></label>
            <label>Female<input type="radio" className='radio' name="gender"defaultChecked={state && state.gender==='female'} value="female" onChange={handleChange}/></label>
            <label>Others<input type="radio" className='radio' name="gender" defaultChecked={state && state.gender==='others'} value="others" onChange={handleChange}/></label></div>
          </div>
          <div className="input">
          <label>Enter Your Mobile</label><br/>
            <input type="tel" placeholder='Mobile Number'name='mobile' defaultValue={state && state.mobile} disabled={name==="update"?true:false} maxLength="10" onChange={handleChange} />
          </div>
          <div className="input">
          <label>Enter Your Email</label><br/>
            <input type="email" name='email' defaultValue={state && state.email} disabled={name==="update"?true:false} placeholder='email' onChange={handleChange}/>
          </div>
          <div className="input">
          <label>Enter Your City</label><br/>
            <input type="text" name='city' defaultValue={state && state.city} placeholder='city' onChange={handleChange}/>
          </div>
          <div className="input">
          <label>Enter Your Pincode</label><br/>
            <input type="tel" placeholder='Pin Code' name='pincode' defaultValue={state && state.pincode} maxLength="6" onChange={handleChange}/>
          </div>
          <div className="input">
            <label>Enter EmployeeCode</label><br/>  
            <input type="text" name='employeeCode' disabled={name==='update'?true:false} defaultValue={state &&state.employeeCode} placeholder='Employee Code' onChange={handleChange}/>
          </div>
          <div className="input">
            <label>Select Your department</label><br/>
            <select name="department" placeholder='Department' defaultValue={state && state.department} onChange={handleChange}>
              <option value="Select your department" disabled="true"  >Select your department</option>
              <option value="Account">Account</option>
              <option value="Legal">Legal</option>
              <option value="Purchase">Purchase</option>
              <option value="Sale">Sale</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
            </select>
          </div>
          <div className="input">
          <label>Enter Your Username</label><br/>
            <input type="text"name='username' value={state && state.username} placeholder='Username' disabled={name==="update"?true:false} onChange={handleChange}/>
          </div>
         {name==="register" &&<> <div className="input">
            <label>Enter Your password</label><br/>
            <input type="password" name="password" value={state &&state.password} placeholder='password' onChange={handleChange}/>
          </div>
          <div className="input">
            <label>Confirm Your password</label><br/>
            <input type="password" name="confirmPassword" placeholder='confirm password' onChange={handleChange}/>
          </div></>}

          
        </form>
      </div>
      <Button variant='contained' className='registerBtn' onClick={validate}>{name}</Button>
    </div>
  )
}

export default RegisterForm