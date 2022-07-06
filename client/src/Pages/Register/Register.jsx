
import React from 'react'
import Header from '../../Components/Header/Header'
import RegisterForm from '../../Components/Header/RegisterationForm/RegisterForm'
import './register.css';
const Register = ({name}) => {
  return (
    <div className='register'>
      <Header addEmp={false} list={true}/>
     <div className='heading'><p>{name==="update"?'Update User':'Add a New User'}</p></div> 
      <RegisterForm name={name}/>
      
    </div>
  )
}

export default Register