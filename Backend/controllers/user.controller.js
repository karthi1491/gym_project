
import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createOrder } from "../services/payment.service.js";
import crypto from "crypto";

export const register = async (req, res) =>{

    console.log(req.body);
    
    const errors = validationResult(req);

   
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName,email,password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await User.hashPassword(password);

        const user = new User({
            firstName,
            lastName,
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


import Admin from '../models/admin.model.js';
import Yoga from '../models/yoga.model.js';
import Dance from '../models/dance.model.js';
import Food from '../models/food.model.js';

export const  login = async (req, res) =>{

    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password, latitude, longitude} = req.body;

    try{
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = await user.generateAuthToken();

        let nearbyGyms = [];
        let nearbyYoga = [];
        let nearbyDance = [];
        let nearbyFood = [];

        if(latitude && longitude){
            const maxDistance = 10000; // 10 km in meters

            nearbyGyms = await Admin.find({
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: maxDistance
                    }
                }
            }).select('-password');

            nearbyYoga = await Yoga.find({
                "location.coordinates": {
                    $geoWithin: {
                        $centerSphere: [[longitude, latitude], maxDistance / 6378137]
                    }
                }
            }).select('-password');

            nearbyDance = await Dance.find({
                "location.coordinates": {
                    $geoWithin: {
                        $centerSphere: [[longitude, latitude], maxDistance / 6378137]
                    }
                }
            }).select('-password');

            nearbyFood = await Food.find({
                "location.coordinates": {
                    $geoWithin: {
                        $centerSphere: [[longitude, latitude], maxDistance / 6378137]
                    }
                }
            }).select('-password');
        }

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
            },
            nearbyGyms,
            nearbyYoga,
            nearbyDance,
            nearbyFood
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }
    const order = await createOrder(amount);
    res.status(201).json(order);
  } catch (error) {
    console.error("Payment order creation error:", error);
    res.status(500).json({ message: "Failed to create payment order", error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment is verified
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};
