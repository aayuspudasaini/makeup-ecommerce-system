import express from "express";
import { login, signup, } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
// authRouter.get("/verify-email/:token", verifyEmail);
// authRouter.post("/forgot-password", forgotPassword);
// authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
