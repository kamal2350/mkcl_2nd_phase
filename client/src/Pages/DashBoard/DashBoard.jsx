import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header'
import { AuthContext } from '../../context/authContext';
import './dashboard.css';

const DashBoard = () => {
  const {user}= useContext(AuthContext);
  const navigate = useNavigate();
  const updatePassword=()=>{
      navigate(`/login/update/${user?.employeeCode}`,user);
  }
  return (
    <div>
        <Header addEmp={true} list={true} logged={true}/>
        <div className='dashBoard'>
            <div className="details">
              <p>Employee Details</p>
              <div className='cards'>
                <div className='card'>
                    <span className='title'>
                      username
                    </span>
                    <hr/>
                    
                    <p className="value">
                     
                     {user?.username}
                    </p>
                    
                </div>
                <div className='card password'>
                    <span className='title'>
                      Password
                    </span>
                    <hr/>
                    <p className="value">{user?.password}</p>
                    <div className='passBtn'>
                    <Button variant ="contained" style={{backgroundColor:'#e85fe8',fontSize:'12px'}} size="small" onClick={updatePassword}>Change password</Button>
                    </div>
                </div>
                <div className='card'>
                    <span className='title'>
                      Mobile Number
                    </span>
                    <hr/>
                    <p className="value">{user?.mobile}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                     Email Address
                    </span>
                    <hr/>
                    <p className="value">{user?.email}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                      First Name
                    </span>
                    <hr/>
                    <p className="value">{user?.firstname}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                      Last Name
                    </span>
                    <hr/>
                    <p className="value">{user?.lastname}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                      Date of Birth
                    </span>
                    <hr/>
                    <p className="value">{user?.dateOfBirth}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                      Gender
                    </span>
                    <hr/>
                    <p className="value">{user?.gender}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                      City
                    </span>
                    <hr/>
                    <p className="value">{user?.city}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                     Employee Code
                    </span>
                    <hr/>
                    <p className="value">{user?.employeeCode}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                      Pin Code
                    </span>
                    <hr/>
                    <p className="value">{user?.pincode}</p>
                </div>
                <div className='card'>
                    <span className='title'>
                      DepartMent
                    </span>
                    <hr/>
                    <p className="value">{user?.department}</p>
                </div>
                
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default DashBoard