// Import necessary modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import videoRoutes from './routes/videoRoutes';
import bookingRoutes from './routes/bookingRoutes';
import categoryRoutes from './routes/categoryRoutes';


import { db } from './config/db.config';

// Middleware
// import errorHandler from './middleware/errorMiddleware';

// Load environment variables
// dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
 }

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/videos', videoRoutes);
app.use('/bookings', bookingRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});