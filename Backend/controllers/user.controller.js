import { validationResult } from "express-validator";
import User from "../models/user.model.js";

export const register = async (req, res) =>{
    console.log(req.body);
    const errors = validationResult(req);

   
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {firstname, lastname,email,password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await User.hashPassword(password);

        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        await user.save();

        const token = await user.generateAuthToken();

        

        res.status(201).json({token});

    }catch(error){
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: "Internal Server Error"});
        res.status(500).json({message: "Server Error"});
    }



}


export const  login = async (req, res) =>{

    console.log(req);

    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        const isMatch = await User.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = await user.generateAuthToken();
        res.status(200).json({token});

       




    }catch(error){
       
        res.status(500).json({message: "Server Error"});
    }


}