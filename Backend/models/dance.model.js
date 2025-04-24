import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const danceSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  academyName: { type: String, required: true },
  danceStyles: [String],
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
  academyImages: [String],
  instructorImages: [String]
});

// Add password hashing and token generation methods
danceSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  return token;
};

const Dance = mongoose.model('Dance', danceSchema);
export default Dance; 