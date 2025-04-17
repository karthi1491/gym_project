import express from 'express';
import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/admin.controller.js';
import { uploadFields } from '../multer/multer.js';

const router = Router();
console.log("Admin routes loaded");

router.post('/register', uploadFields,[
    body('firstName').isLength({min:3}).withMessage('Firstname must be at least 3 characters long'),
    body('lastName').isLength({min:3}).withMessage('Lastname must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('subscriptionPrices').custom((value) => {
        try {
            const prices = typeof value === 'string' ? JSON.parse(value) : value;
            if (!prices.oneMonth || !prices.threeMonths || !prices.sixMonths || !prices.oneYear) {
                throw new Error('All subscription prices are required');
            }
            return true;
        } catch (error) {
            throw new Error('Invalid subscription prices format');
        }
    }),
    body('location.address').notEmpty().withMessage('Address is required'),
    body('location.coordinates').isArray().withMessage('Coordinates must be an array'),
    body('location.googleMapsLink').notEmpty().withMessage('Google Maps link is required')
],  register);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], login);

export default router;