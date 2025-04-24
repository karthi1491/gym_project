import { validationResult } from "express-validator";
import Dance from "../models/dance.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      academyName,
      danceStyles,
      subscriptionPrices,
      location
    } = req.body;

    const academyImages = req.files['academyImages'] ? req.files['academyImages'].map(file => file.path) : [];
    const instructorImages = req.files['instructorImages'] ? req.files['instructorImages'].map(file => file.path) : [];

    const existingAcademy = await Dance.findOne({ email });
    if (existingAcademy) {
      return res.status(400).json({ message: "Academy already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dance = new Dance({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      academyName,
      danceStyles,
      subscriptionPrices: subscriptionPrices,
      location,
      academyImages,
      instructorImages
    });

    await dance.save();
    const token = await dance.generateAuthToken();

    res.status(201).json({
      message: "Registration successful",
      token,
      dance
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}; 