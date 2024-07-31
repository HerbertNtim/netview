import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/signup", signUp);
authRouter.get("/login", login);
authRouter.get("/login", logout);

export default authRouter;
