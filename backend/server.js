import express from "express";
import authRouter from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json()); // Middleware to parse JSON data

// Routers 
app.use("/netview/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
