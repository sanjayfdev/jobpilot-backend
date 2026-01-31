import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log("DB Connection Error: ", err));
};