import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Signup
export const signup = async (req: Request, res: Response) => {
   try {
      const { name, email, password } = req.body;

      const existingUser = await User.exists({ email });

      if (existingUser)
         return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
         name,
         email,
         password: hashedPassword,
         verificationToken,
      });

      await newUser.save();

      const verificationToken = jwt.sign(
         { id: newUser._id, role: newUser.role },
         process.env.JWT_SECRET!,
         { expiresIn: "1d" }
      );

      res.status(201).json({
         message: "User registered successfully. Please verify your email.",
      });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};

// Login
export const login = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
         { id: user._id, role: user.role },
         process.env.JWT_SECRET as string,
         { expiresIn: "1d" }
      );

      res.json({ token, role: user.role });
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};
