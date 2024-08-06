import express from "express";
import authRouter from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import movieRouter from "./routes/movie.route.js";
import tvRouter from "./routes/tv.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protectedRoute } from "./middleware/protectedRoute.js";
import searchRouter from "./routes/search.route.js";

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json()); // Middleware to parse JSON data
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors())

// Routers 
app.use("/netview/auth", authRouter);
app.use("/netview/movies", protectedRoute, movieRouter);
app.use("/netview/tv", protectedRoute, tvRouter);
app.use("/netview/search", protectedRoute, searchRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
