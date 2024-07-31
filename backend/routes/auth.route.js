import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/login", logout);

export default authRouter;
