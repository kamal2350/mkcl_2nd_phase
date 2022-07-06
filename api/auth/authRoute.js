import express from 'express';
import { deleteEmployee, getAllEmployees, getEmployeeByCode, loginUser, logoutEmployee, registerEmployee, updateEmployeeByCode } from '../controller/auth.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router=express.Router();
router.post('/register',registerEmployee);
router.post('/login',loginUser);
router.get('/employees',getAllEmployees);
router.get('/employees/:id',verifyUser,getEmployeeByCode);
router.put('/update/:id',updateEmployeeByCode);
router.delete('/delete/:id',verifyAdmin,deleteEmployee);
router.get('/logout',verifyUser,logoutEmployee)
export default router;