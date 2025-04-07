import { validationResult } from "express-validator";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, password, subscriptionPrices, location} = req.body;

    try{
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message: "Admin already exists"});
        }

        const hashedPassword = await Admin.hashPassword(password);

        // Process uploaded images
        const gymImages = req.files.gymImages?.map(file => file.path) || [];
        const trainerImages = req.files.trainerImages?.map(file => file.path) || [];

        const admin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gymImages,
            trainerImages,
            subscriptionPrices: JSON.parse(subscriptionPrices),
            location: {
                address: location.address,
                coordinates:  [
                    parseFloat(location.coordinates[0]),
                    parseFloat(location.coordinates[1])
                  ],
                googleMapsLink: location.googleMapsLink
            }
        })

        await admin.save();

        const token = await admin.generateAuthToken();

        res.status(201).json({token});

    }catch(error){
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: "Internal Server Error"});
        
    }
}

export const login = async (req, res) =>{

    console.log(req.body);
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

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
                gymImages: admin.gymImages,
                trainerImages: admin.trainerImages,
                subsciptionPrices: admin.subsciptionPrices,
                location: admin.location
            }
        });
    }
    catch (error) {
        console.error("Login error:", error.message);
        console.error(error.stack); // 🔍 full error trace
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const admin = await Admin.findById(req.admin.id);
        if(!admin){
            return res.status(400).json({message: "Admin not found"});
        }

        const {firstName, lastName, subsciptionPrices, location} = req.body;

        // Update basic info if provided
        if(firstName) admin.firstName = firstName;
        if(lastName) admin.lastName = lastName;
        if(subsciptionPrices) admin.subsciptionPrices = JSON.parse(subsciptionPrices);
        
        // Update location if provided
        if(location) {
            admin.location = {
                address: location.address,
                coordinates: {
                    type: 'Point',
                    coordinates: location.coordinates
                },
                googleMapsLink: location.googleMapsLink
            };
        }

        // Update images if provided
        if(req.files) {
            if(req.files.gymImages) {
                admin.gymImages = req.files.gymImages.map(file => file.path);
            }
            if(req.files.trainerImages) {
                admin.trainerImages = req.files.trainerImages.map(file => file.path);
            }
        }

        await admin.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            admin: {
                id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                gymImages: admin.gymImages,
                trainerImages: admin.trainerImages,
                subsciptionPrices: admin.subsciptionPrices,
                location: admin.location
            }
        });

    } catch (error) {
        console.error("Update error:", error.message);
        console.error(error.stack);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);
        if(!admin){
            return res.status(400).json({message: "Admin not found"});
        }

        return res.status(200).json({
            admin: {
                id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                gymImages: admin.gymImages,
                trainerImages: admin.trainerImages,
                subsciptionPrices: admin.subsciptionPrices,
                location: admin.location
            }
        });

    } catch (error) {
        console.error("Profile fetch error:", error.message);
        console.error(error.stack);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}