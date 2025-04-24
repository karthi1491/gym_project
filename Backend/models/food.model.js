import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const foodSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  restaurantName: { type: String, required: true },
  cuisine: [String],
  priceRange: String,
  deliveryTime: Number,
  location: {
    address: String,
    coordinates: [Number],
    googleMapsLink: String
  },
  menuItems: [{
    name: String,
    price: Number,
    description: String,
    category: String
  }],
  restaurantImages: [String]
});

// Add password hashing and token generation methods
foodSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  return token;
};

const Food = mongoose.model('Food', foodSchema);
export default Food; 