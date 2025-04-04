import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) =>{
    
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

    console.log(req.body);
try{const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    
  
    const {email, password} = req.body;

    
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = await user.generateAuthToken();

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            }
        });
     

       
    }



    catch (error) {
        console.error("Login error:", error.message);
        console.error(error.stack); // 🔍 full error trace
        return res.status(500).json({ message: "Server Error", error: error.message });
      }


}