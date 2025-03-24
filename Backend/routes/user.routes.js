import express from 'express';
import { Router } from 'express';
import { body } from 'express-validator';


const router = Router();

router.post('/register', [
    body('firstname').isLength({min:3}).withMessage('Firstname must be at least 3 characters long'),
    body('lastname').isLength({min:3}).withMessage('Lastname must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
]
   
)

router.get('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
])

