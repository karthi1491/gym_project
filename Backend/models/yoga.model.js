import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const yogaSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studioName: { type: String, required: true },
  yogaStyles: [String],
  subscriptionPrices: {
    oneDay: Number,
    oneMonth: Number,
    threeMonths: Number,
    sixMonths: Number,
    oneYear: Number
  },
  location: {
    address: String,
    coordinates: [Number],
    googleMapsLink: String
  },
  studioImages: [String],
  instructorImages: [String]
});

// Add password hashing and token generation methods similar to admin model
yogaSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  return token;
};

const Yoga = mongoose.model('Yoga', yogaSchema);
export default Yoga; 