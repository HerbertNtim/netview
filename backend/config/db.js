import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGODB_URL);
    console.log(`MongoDB connected: Locally on laptop`);
  } catch (error) {
    console.error(`Error in connecting to mongoDB: ${error.message}`);
    process.exit(1);
  }
}
