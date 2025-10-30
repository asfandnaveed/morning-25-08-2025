// const express = require('express');
import express from 'express';
const app = express();

import productRoute from './routes/productRoutes.js';
import userRoute from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

app.use(express.json()); // Req data to Json 



app.use('/api/product' , productRoute);

app.use('/api/user', userRoute);

app.use('/api/admin' , adminRoutes);




app.listen(5002 , ()=> console.log('Server is Running'));