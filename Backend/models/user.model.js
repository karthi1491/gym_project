import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Firstname must be at least 3 characters long"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Lastname must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, "Password must be at least 6 characters"],
    select: false, // Password won't be returned by default
  },
  socketId: {
    type: String,
    default: "",
  },
});

// 🔑 Generate JWT Token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// 🔐 Hash password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// 🔍 Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};





const User = mongoose.model("User", userSchema);
export default User;
