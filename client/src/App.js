import logo from './logo.svg';
import './App.css';
import Home from './Pages/home/Home';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,

  Navigate,
  useNavigate
} from "react-router-dom";
import Register from './Pages/Register/Register';
import EmployeeList from './Pages/Employees/EmployeeList';
import Login from './Pages/Login/Login';
import DashBoard from './Pages/DashBoard/DashBoard';
import RegisterForm from './Components/Header/RegisterationForm/RegisterForm';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import UpdatePassword from './Components/UpdatePasswordModal/UpdatePassword';

function App() {
  const{user}=useContext(AuthContext);
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={!user?<Login/>:<DashBoard/>}/>
        <Route path='/register' element={<Register name="register"/>}/>
        <Route path='/employees' element={user?<EmployeeList/>:<Navigate to="/"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path ="login/:id" element={user?<DashBoard/>:<Navigate to="/login"/>}/>
        <Route path="update/:id" element={user?.isAdmin?<Register name="update"/>:<Navigate to="/employees"/>}/>
        <Route path="login/update/:id" element={user?<UpdatePassword/>:<Navigate to="/login"/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
