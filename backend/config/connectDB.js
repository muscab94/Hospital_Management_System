import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
    console.log("Connected successfully");
  } catch (error) {
    console.error("connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
