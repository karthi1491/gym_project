import express from 'express';
import { body } from 'express-validator';
import { register } from '../controllers/food.controller.js';
import { uploadFields } from '../multer/multer.js';
import { parseJsonMiddleware } from '../middlewares/parseJsonMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  uploadFields,
  parseJsonMiddleware(['subscriptionPrices', 'location']),
  [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // Add other validations as needed
  ],
  register
);

export default router;
