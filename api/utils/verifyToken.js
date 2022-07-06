import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken =(req,res,next)=>{

    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json("You are not authenticated");
    }
    else{
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                return next(createError(403,"Your token is not valid"));
            }
            console.log(user);
            req.user=user;
            return next();
        });
    }

} 

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if((req.user.eCode===req.params.id)||(req.user.isAdmin)){
            return next();
        }
        else{
           return next(createError(403,"You are not authorized"));
        }
    });
}

export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
        return next(createError(403,"You are not authorized"));
        }

    })
}