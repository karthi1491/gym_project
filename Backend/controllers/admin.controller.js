import { validationResult } from "express-validator";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, password, subscriptionPrices, location} = req.body;
    const gymImages = req.files['gymImages'] ? req.files['gymImages'].map(file => file.path) : [];
    const trainerImages = req.files['trainerImages'] ? req.files['trainerImages'].map(file => file.path) : [];

    try {
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message: "Admin already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            subscriptionPrices: JSON.parse(subscriptionPrices),
            location,
            gymImages,
            trainerImages
        });

        await admin.save();
        const token = await admin.generateAuthToken();

        res.status(201).json({
            message: "Registration successful",
            token,
            admin
        });

    } catch(error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        const admin = await Admin.findOne({email}).select("+password");
        if(!admin){
            return res.status(400).json({message: "Admin does not exist"});
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = await admin.generateAuthToken();

        return res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                subscriptionPrices: admin.subscriptionPrices,
                location: admin.location,
                gymImages: admin.gymImages,
                trainerImages: admin.trainerImages
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        return res.status(200).json({ admins });
    } catch (error) {
        console.error("Error fetching all admins:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
