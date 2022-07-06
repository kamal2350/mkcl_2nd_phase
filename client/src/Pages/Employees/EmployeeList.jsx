import { Button } from '@mui/material';
import React,{ useEffect } from 'react'
import Header from '../../Components/Header/Header';
import './employeelist.css';
import swal from 'sweetalert';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';
const EmployeeList = () => {
    const[list,setList]=useState([]);
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    const navigate = useNavigate();
 
    useEffect(()=>{
        const getAllUsers=async()=>{
            const res= await axios.get('/auth/employees/');
           console.log(res.data);
            setList(res.data);

        }
        getAllUsers();
      },[]);
      const reFetch =async()=>{
        try {
            const res= await axios.get('/auth/employees');
            setList(res.data);
        } catch (error) {
            console.log(error);
        }
      }
    const handleDelete =async(eCode)=>{
        console.log(eCode);
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete the employee?",
            icon: "warning",
            dangerMode: true,
          })
          .then(willDelete => {
            
            if (willDelete) {
                async function deleteByEmpCode (){
                 
                    try {
                         const res=  await axios.delete(`auth/delete/${eCode}`);
                        reFetch();
                        
                        console.log(res);
                        swal({
                            title:`${res.data} with id: ${eCode}`,
                        })
                        console.log(res);
                  
    
                    } catch (error) {
                        console.log(error);
                        swal({
                            
                            title:'Sorry, You are not authorized to do that!'
                        })
                    }
                }
                deleteByEmpCode();
               
              swal("Deleted!", "Your imaginary file has been deleted!", "success");
            }
          });
      }
 
const handleUpdate=(user)=>{
    // console.log(user);
    
    navigate(`/update/${user?.employeeCode}`,{state:{id:user?._id,firstname:user?.firstname,
        lastname:user?.lastname,dateOfBirth:user?.dateOfBirth,gender:user?.gender,
        mobile:user?.mobile,email:user?.email,city:user?.city,pincode:user?.pincode,
        password:user?.password,
        employeeCode:user?.employeeCode,department:user?.department,username:user?.username}});

}    // 

     
  return (
    <div className='employeeList'>
        <Header addEmp={true} list={false}/>
        <div className="empList">
            <table  className='empTable'>
                <tr className='empHead'>
                    {/* <td>S.No</td> */}
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Gender</td>
                    <td>Mobile</td>
                    <td>Email</td>
                    <td>city</td>
                    <td>Action</td>
                </tr>
           
                
               {
                list.map((user,id)=>(
                    <tr className='empData' key={id}>
                    
                        {/* <td>1</td> */}
                        <td>{user?.firstname}</td>
                        <td>{user?.lastname}</td>
                        <td>{user?.gender}</td>
                        <td>{user?.mobile}</td>
                        <td>{user?.email}</td>
                        <td>{user?.city}</td>
                        <td><Button style={{ fontSize:'10px', backgroundColor:'lightgreen',color:'white',marginRight:'3px'}}
                         size='small' onClick={()=>handleUpdate(user)} >Update</Button><Button style={{backgroundColor:'red',color:'white',fontSize:'10px'}} size='small' onClick={(e)=>handleDelete(user.employeeCode)}>delete</Button></td>
                    </tr>
                ))
               }
            </table>
        </div>
    </div>
  )
}

export default EmployeeList