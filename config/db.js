import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mini_api");
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;
