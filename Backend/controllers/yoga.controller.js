import { validationResult } from "express-validator";
import Yoga from "../models/yoga.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array());
    return res.status(400).json({ 
      message: "Validation failed",
      errors: errors.array()
    });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      studioName,
      yogaStyles,
      subscriptionPrices,
      location
    } = req.body;

    // Parse location from JSON string if it's a string
    let parsedLocation = location;
    if (typeof location === 'string') {
      try {
        parsedLocation = JSON.parse(location);
      } catch (err) {
        console.error('Error parsing location:', err);
        return res.status(400).json({ message: 'Invalid location format' });
      }
    }

    const studioImages = req.files['studioImages'] ? req.files['studioImages'].map(file => file.path) : [];
    const instructorImages = req.files['instructorImages'] ? req.files['instructorImages'].map(file => file.path) : [];

    const existingStudio = await Yoga.findOne({ email });
    if (existingStudio) {
      return res.status(400).json({ message: "Studio already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const yoga = new Yoga({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      studioName,
      yogaStyles,
      subscriptionPrices: subscriptionPrices,
      location: parsedLocation,
      studioImages,
      instructorImages
    });

    await yoga.save();
    const token = await yoga.generateAuthToken();

    res.status(201).json({
      message: "Registration successful",
      token,
      yoga
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
