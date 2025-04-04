const { string, object, enum: zodEnum } = require("zod");

// Validation schema for user registration
const registerSchema = object({
    name: string()
        .min(1, "Name is required")
        .max(50, "Name must not exceed 50 characters"),
    email: string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    password: string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must not exceed 100 characters"),
    role: zodEnum(["admin", "user"]).optional(), // Optional, defaults to "user"
});

// Validation schema for user login
const loginSchema = object({
    email: string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    password: string()
        .min(1, "Password is required"),
});

// Validation schema for password reset
const resetPasswordSchema = object({
    email: string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    resetToken: string()
        .min(1, "Reset token is required"),
    newPassword: string()
        .min(6, "New password must be at least 6 characters long")
        .max(100, "New password must not exceed 100 characters"),
});

// Validation schema for email verification
const verifyEmailSchema = object({
    email: string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    verificationToken: string()
        .min(1, "Verification token is required"),
});

module.exports = {
    registerSchema,
    loginSchema,
    resetPasswordSchema,
    verifyEmailSchema,
};