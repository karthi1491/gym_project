import dotenv from 'dotenv';
import express from 'express';


import cors from 'cors';

import connectDB from '../Backend/db/db.js'
dotenv.config();

connectDB();




const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({message: 'Hello World'});
})


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})





