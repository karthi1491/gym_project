import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import connectDB from './db/db.js';
import userRoutes from './routes/user.routes.js';

import cookieParser from 'cookie-parser';
import adminRoutes from './routes/admin.routes.js';

import yogaRoutes from './routes/yoga.routes.js';
import danceRoutes from './routes/dance.routes.js';
import foodRoutes from './routes/food.routes.js';


const app = express();



dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/yoga', yogaRoutes);
app.use('/dance', danceRoutes);
app.use('/food', foodRoutes);



export default app;