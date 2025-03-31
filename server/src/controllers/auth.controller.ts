import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import { doHash, doHashValidator } from "../utils/hashing";
import { signupSchema, loginSchema } from "../middlewares/validator";
import crypto from "crypto";

export const authController ={
    register : async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await doHash(password, 12);

        const newUser = new User({
            email,
            password: hashedPassword,
        });
        const result = await newUser.save();
        result.password = undefined;

        res.status(201).json({
            success: true,
            message: "Your account has been created successfully",
            result,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
},

 login : async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const { error, value } = loginSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        if (!existingUser.password) {
            return res.status(500).json({ success: false, message: "Password is not defined for the user" });
        }
        const isPasswordValid = await doHashValidator(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        if (!process.env.SECRET) {
            return res.status(500).json({ success: false, message: "Token secret is not defined" });
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified,
            },
            process.env.SECRET,
            { expiresIn: "8h" }
        );

        res.cookie("authorization", "Bearer " + token, {
            expires: new Date(Date.now() + 8 * 3600000), // 8 hours
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
        }).json({
            success: true,
            token,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
},
forgetPassword: async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await doHash(resetToken, 12);

        // Save the reset token and its expiration in the database
        user.forgotPasswordCode = hashedToken;
        user.forgotPasswordCodeValidation = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send the reset token to the user (e.g., via email)
        // For now, we'll just return it in the response
        res.status(200).json({
            success: true,
            message: "Password reset token generated successfully",
            resetToken, // In production, send this via email instead
        });
    } catch (error) {
        console.error("Error during forget password:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
},

emailVerification: async (req: Request, res: Response) => {
    const { email, verificationCode } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        if (!user.verificationCode || !user.verificationCodeValidation) {
            return res.status(400).json({ success: false, message: "No verification code found" });
        }

        if (Date.now() > user.verificationCodeValidation) {
            return res.status(400).json({ success: false, message: "Verification code has expired" });
        }

        const isCodeValid = await doHashValidator(verificationCode, user.verificationCode);
        if (!isCodeValid) {
            return res.status(400).json({ success: false, message: "Invalid verification code" });
        }

        // Mark the user as verified
        user.verified = true;
        user.verificationCode = null;
        user.verificationCodeValidation = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        console.error("Error during email verification:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
},
logout: async (req: Request, res: Response) => {
    try {
        // Clear the authorization cookie
        res.clearCookie("authorization", {
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
},
}

