import express from "express";
import { authCheck, login, logout, signUp } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/authCheck", protectedRoute, authCheck);

export default authRouter;
