import express from 'express';
import { Router } from 'express';
import { body } from 'express-validator';

import { register, login, createPaymentOrder, verifyPayment } from '../controllers/user.controller.js';


const router = Router();

router.post('/register', [
    body('firstName').isLength({min:3}).withMessage('Firstname must be at least 3 characters long'),
    body('lastName').isLength({min:3}).withMessage('Lastname must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], register);
   


router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
] , login);

router.post('/payment/order', createPaymentOrder);

router.post('/payment/verify', verifyPayment);



export default router;
// Compare this snippet from Backend/routes/user.routes.js: