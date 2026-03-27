import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {PORT,mongoDBURL} from './config/config.js'
import authRoutes from './routes/authRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'
import dietRoutes from './routes/dietRoutes.js'
import transformationRoutes from './routes/transformationRoutes.js'
import cors from 'cors';

dotenv.config();

const app = express();
const corsOptions = {
  origin: 'https://fitnesstrackapp-frontend.onrender.com', //  frontend origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/transformation',transformationRoutes)

// MongoDB connection
mongoose.connect(mongoDBURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err)); 

// Sample route
app.get('/', (req, res) => res.send('API is running...'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
