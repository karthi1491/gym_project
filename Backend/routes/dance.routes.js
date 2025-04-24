import express from 'express';
import { Router } from 'express';
import { body } from 'express-validator';
import { register } from '../controllers/dance.controller.js';
import { uploadFields } from '../multer/multer.js';

const router = Router();

const parseJsonMiddleware = (req, res, next) => {
  if (req.body.subscriptionPrices && typeof req.body.subscriptionPrices === 'string') {
    try {
      req.body.subscriptionPrices = JSON.parse(req.body.subscriptionPrices);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid subscriptionPrices format' });
    }
  }
  if (req.body.location && typeof req.body.location === 'string') {
    try {
      req.body.location = JSON.parse(req.body.location);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid location format' });
    }
  }
  next();
};

router.post('/register', uploadFields, parseJsonMiddleware, [
  body('firstName').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
  body('lastName').isLength({ min: 3 }).withMessage('Lastname must be at least 3 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('academyName').notEmpty().withMessage('Academy name is required'),
  body('danceStyles').notEmpty().withMessage('Dance styles are required'),
  body('subscriptionPrices.oneDay').notEmpty().withMessage('Subscription price for oneDay is required'),
  body('subscriptionPrices.oneMonth').notEmpty().withMessage('Subscription price for oneMonth is required'),
  body('subscriptionPrices.threeMonths').notEmpty().withMessage('Subscription price for threeMonths is required'),
  body('subscriptionPrices.sixMonths').notEmpty().withMessage('Subscription price for sixMonths is required'),
  body('subscriptionPrices.oneYear').notEmpty().withMessage('Subscription price for oneYear is required'),
  body('location.address').notEmpty().withMessage('Address is required'),
  body('location.coordinates').isArray().withMessage('Coordinates must be an array'),
  body('location.googleMapsLink').notEmpty().withMessage('Google Maps link is required')
], register);

export default router;
