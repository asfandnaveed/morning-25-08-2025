// const express = require('express');
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
// dotenv.config();

import productRoute from './routes/productRoutes.js';
import userRoute from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();


const PORT = process.env.PORT;

app.use(cors());
app.use(express.json()); // Req data to Json 




app.use('/api/product' , productRoute);

app.use('/api/user', userRoute);

app.use('/api/admin' , adminRoutes);




app.listen(PORT , ()=> console.log('Server is Running :' + PORT));