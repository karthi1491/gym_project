import mongoose from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Firstname must be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Lastname must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [6, "Password must be at least 6 characters"],
        select: false
    },
    gymImages: [{
        type: String,
        required: true,
    }],
    trainerImages: [{
        type: String,
        required: true,
    }],

    // ✅ FIXED typo here
    subscriptionPrices: {
        oneDay: {
            type: Number,
            required: true
        },
        oneMonth: {
            type: Number,
            required: true
        },
        threeMonths: {
            type: Number,
            required: true
        },
        sixMonths: {
            type: Number,
            required: true
        },
        oneYear: {
            type: Number,
            required: true
        }
    },

    // ✅ FIXED GeoJSON structure
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        googleMapsLink: {
            type: String,
            required: true,
            trim: true,
        }
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


adminSchema.index({ "location.coordinates": "2dsphere" });


// 🔑 Generate JWT Token
adminSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


// 🔐 Hash password

adminSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


// 🔍 Compare password

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}




export default mongoose.model("Admin", adminSchema);