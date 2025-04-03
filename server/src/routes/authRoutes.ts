import express from "express";
import { login, signup } from "../controllers/authController";
import { signupValidator, loginValidator } from "../validations/authValidators";
import { validateRequest } from "../middlewares/validateRequest";

const authRouter = express.Router();

authRouter.post("/signup", signupValidator, validateRequest, signup);
authRouter.post("/login", loginValidator, validateRequest, login);
// authRouter.get("/verify-email/:token", verifyEmail);
// authRouter.post("/forgot-password", forgotPassword);
// authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
