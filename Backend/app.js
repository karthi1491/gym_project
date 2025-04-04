import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import connectDB from './db/db.js';
import userRoutes from './routes/user.routes.js';

import cookieParser from 'cookie-parser';

const app = express();



dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/user', userRoutes);



export default app;