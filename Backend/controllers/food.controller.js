import { validationResult } from 'express-validator';
import Food from '../models/food.model.js';
import bcrypt from 'bcrypt';

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
      cuisine,
      priceRange,
      deliveryTime,
      restaurantName,
      menuItems,
      location
    } = req.body;

    const restaurantImages = req.files['restaurantImages'] ? req.files['restaurantImages'].map(file => file.path) : [];
    const instructorImages = req.files['instructorImages'] ? req.files['instructorImages'].map(file => file.path) : [];

    const existingFood = await Food.findOne({ email });
    if (existingFood) {
      return res.status(400).json({ message: 'Food provider already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let parsedMenuItems = [];
    if (typeof menuItems === 'string' && menuItems.trim() !== '') {
      try {
        parsedMenuItems = JSON.parse(menuItems);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid menuItems format' });
      }
    } else if (Array.isArray(menuItems)) {
      parsedMenuItems = menuItems;
    }

    const food = new Food({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      cuisine,
      priceRange,
      deliveryTime,
      restaurantName,
      menuItems: parsedMenuItems,
      location,
      restaurantImages,
      instructorImages
    });

    await food.save();
    const token = await food.generateAuthToken();

    res.status(201).json({
      message: 'Registration successful',
      token,
      food
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
