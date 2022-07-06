import Employee from "../models/Employee.js";
import jwt  from "jsonwebtoken";
import { createError } from "../utils/error.js";
export const registerEmployee =async(req,res)=>{

   


    try {
        const newEmployee  = new Employee({
            ...req.body
        });
        const savedEmployee = await newEmployee.save(newEmployee);
        
        res.status(201).json(savedEmployee);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
};

export const loginUser = async(req,res)=>{
    try {
        // const employee= new Employee({
        //     username:req.body.username,
        //     password:req.body.password,
        // });
        const emp = await Employee.findOne({username:req.body.username});
        if(!emp){
            return res.status(404).json({message:`this ${req.body.username} is not valid`})
        }
        console.log(emp);

        if(emp.password===req.body.password){
           const token= jwt.sign({id:emp._id,eCode:emp.employeeCode,isAdmin:emp.isAdmin},process.env.SECRET_KEY);
            res.cookie("access_token",token,{
                httpOnly:true,
                expires:(new Date(Date.now()+86400*1000))
            }).status(200).json(emp);
           
        }
        else{
            return res.status(403).json("username and password is invalid");
        }

    } catch (error) {
        res.status(401).json(error);
    }
}

export const getAllEmployees=async(req,res)=>{
    try {
        const employees = await Employee.find();
        // const[password,...otherDetails]=employees;
        res.status(200).json(employees);

        
    } catch (error) {
        res.status(404).json(error.message);
    }
}

export const getEmployeeByCode=async(req,res)=>{
    try {
        const id= req.params.id;
        const employee = await Employee.find({employeeCode:id});
        console.log(employee);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json(error.message);
    }
}
export const updateEmployeeByCode=async(req,res)=>{
    try {
        const id= req.params.id;
        const{pincode,firstname,password,lastname,city,dateOfBirth,gender,department}=req.body.credentials;

        const emp = await Employee.updateOne({employeeCode:id},{
            $set:{
                pincode,firstname,lastname,password,city,dateOfBirth,gender,department
            },
        });


        console.log(emp);
        res.status(200).json(emp);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const deleteEmployee=async(req,res)=>{
    const id = req.params.id;
    try {
         const employee= await Employee.deleteOne({employeeCode:id});
         res.status(200).json("User deleted Successfully");

    } catch (error) {
        return createError(403,"Sorry you are not authorized to do that");
    }
}
export const logoutEmployee =async(req,res)=>{
    try {
       await res.clearCookie('access_token');
       res.end();
    } catch (error) {
        res.status(500).json(error);
    }
}



