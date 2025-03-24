import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {isEmail} from "express-validator";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({

    firstname: {
        type:String,
        required:true,
        trim:true,
        minLenght:[3, "Firstname must be at least 3 characters long"]

    },

    lastname:{
        type:String,
        required:true,
        trim:true,
        minLenght:[3, "Lastname must be at least 3 characters long"]

    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        valodate:[isEmail, "Please enter a valid email address"]

        
    }, 
    password:{
        type:String,
        required:true,
        trim:true,
        minLenght:[6, "Password must be at least 6 characters"],
        select:false,



    },

    sockedId:{
        type:String,
        default:""
    },

})

userSchema.methods.generateAuthToken = async function(){
    return jwt.sign({id:this.id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE});
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword  = async function(password){
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User", userSchema);