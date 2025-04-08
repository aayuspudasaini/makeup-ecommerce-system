const { string, object, enum: zodEnum } = require("zod");
const { emailSchema, passwordSchema } = require("./global.validation");

// Validation schema for user registration
const registerSchema = object({
    name: string()
        .min(1, "Name is required")
        .max(50, "Name must not exceed 50 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: passwordSchema,
}).refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"],
});

// Validation schema for user login
const loginSchema = object({
    email: emailSchema,
    password: string().min(1, "Password is required"),
});

// Validation schema for password reset
const resetPasswordSchema = object({
    email: emailSchema,
    resetToken: string().min(1, "Reset token is required"),
    newPassword: string()
        .min(6, "New password must be at least 6 characters long")
        .max(100, "New password must not exceed 100 characters"),
});

// Validation schema for email verification
const verifyEmailSchema = object({
    email: emailSchema,
    verificationToken: string().min(1, "Verification token is required"),
});

module.exports = {
    registerSchema,
    loginSchema,
    resetPasswordSchema,
    verifyEmailSchema,
};
