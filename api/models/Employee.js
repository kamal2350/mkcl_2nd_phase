import mongoose from "mongoose";
import validator from 'validator';
const EmployeeSchema = new mongoose.Schema(
    {
        firstname:{
            type:'String',
            required:true,
        },
        lastname:{ 
            type:'String',
            required:true,
        },
        dateOfBirth:{
            type:'String',
            required:true,
        },
        gender:{
            type:'String',
            required:true,
        },
        mobile:{
            type:'String',
            required:true,
            unique:true,
            validate:{
                validator:validator.isMobilePhone,
                message:`Enter a valid Phone Number`,
                isAsync:false
            }
        },
        email:{
            type:'String',
            required:true,
            unique:true,
            validate:{
                validator:validator.isEmail,
                message:`Enter a Valid Email`,
                isAsync:false
            }
        },
        city:{
            type:'String',
            required:true,
        },
        employeeCode:{
            type:'String',
            unique:true,
            required:true
        },
        pincode:{
            type:Number,
            required:true,
            // validate:{
            //     validator:validator.isPostalCode,
            //     message:`Enter a valid Pin code`
            // }
        },
        department:{
            type:'String',
            required:true
        },
        username:{
            type:'String',
            required:true,
            unique:true,
        },
        password:{
            type:'String',
            required:true,
         
        },
        isAdmin:{
            type:Boolean,
            default:false
            
        }


},
{
    timestamps:true,
});

export default mongoose.model('Employee',EmployeeSchema);