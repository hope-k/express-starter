import 'dotenv/config.js';
import express from 'express';
import passport from 'passport';
import connectDB from './config/database.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.js';
import configurePassport from './config/passport.js';


const app = express();
connectDB();

configurePassport(passport)
app.use(passport.initialize());


const PORT = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api', authRoutes);


// Error Handler
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})