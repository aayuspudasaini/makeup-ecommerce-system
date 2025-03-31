import { Router } from "express";
import { RequestHandler } from "express";
import { authController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", authController.register as RequestHandler);
authRouter.post("/login", authController.login as RequestHandler);
authRouter.post("/forget-password", authController.forgetPassword as RequestHandler);
authRouter.post("/logout", authController.logout as RequestHandler);

export default authRouter;
