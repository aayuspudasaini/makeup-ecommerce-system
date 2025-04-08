const { string, z, custom } = require("zod");

/**
 * @desc This section contains all the global validation schema
 * It Include @EmailSchema & @PasswordSchema
 */

const emailSchema = string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" })
    .endsWith(".com", { message: "Invalid Email Address" });

const passwordSchema = string({ required_error: `Password is required` })
    .min(6, `Password must be at least 6 characters long.`)
    .regex(/^(?!\s*$).+/, `Password must not contain Whitespaces.`)
    .regex(
        /^(?=.*[A-Z])/,
        `Password must contain at least one uppercase letter.`
    )
    .regex(
        /^(?=.*[a-z])/,
        `Password must contain at least one lowercase letter.`
    )
    .regex(/^(?=.*\d)/, `Password must contain at least one number.`)
    .regex(
        /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
        `Password must contain at least one special character.`
    );

const FileSchema = z
    .instanceof(File)
    .refine(
        (file) =>
            ["image/png", "image/jpeg", "image/jpg", "video/mp4"].includes(
                file.type
            ),
        {
            message:
                "Invalid file type. Only PNG, JPEG, JPG, or MP4 are allowed.",
        }
    )
    .refine((files) => files?.length == 1, "File is required.")
    .refine((file) => file.size <= fileSizeLimit, {
        message: "File size should not exceed 10MB",
    });

module.exports = {
    emailSchema,
    passwordSchema,
    FileSchema,
};
