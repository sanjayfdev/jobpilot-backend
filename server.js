import express from 'express';
import { connectDB } from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import jobRoutes from './src/routes/job.routes.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});