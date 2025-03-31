import mongoose, { Schema, Document } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  email: string;
  password?: string;
  verified: boolean;
  verificationCode: string | null;
  verificationCodeValidation: number | null;
  forgotPasswordCode: string | null;
  forgotPasswordCodeValidation: number | null;
}

// Define the User schema
const userSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      unique: [true, "Email already exists."],
      minLength: [5, "Email must have at least 5 characters"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    verificationCodeValidation: {
      type: Number,
      select: false,
    },
    forgotPasswordCode: {
      type: String,
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Export the User model
const User = mongoose.model<IUser>("User", userSchema);
export default User;