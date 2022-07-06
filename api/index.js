import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from '../api/auth/authRoute.js';
import cors from 'cors';
const app= express();
dotenv.config();
const connection=async()=>{ 
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('connected');
    } catch (error) {
        throw error;
    }
}

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth',authRoute);

app.use(express.json());
app.use(cookieParser());
app.listen(5000,()=>{
    connection();
    console.log("database connected Successfully");
})