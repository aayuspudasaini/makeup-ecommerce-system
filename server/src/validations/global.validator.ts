import { string } from "zod";

export const emailSchema = string()
   .email("Invalid Email Address")
   .nonempty({ message: "Email is required" })
   .min(1, "Email is required.");

export const passwordSchema = string({ required_error: "Password is required" })
   .min(6, "Password must be at least 6 characters long.")
   .regex(/^(?!\s*$).+/, "Password must not contain Whitespaces.")
   .regex(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter."
   )
   .regex(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter."
   )
   .regex(/^(?=.*\d)/, "Password must contain at least one number.")
   .regex(
      /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
      "Password must contain at least one special character."
   );
