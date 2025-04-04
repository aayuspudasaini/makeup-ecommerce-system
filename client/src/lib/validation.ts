import { object, string, boolean } from "zod";

/**
 * @desc This section contains all the global validation schema
 * It Include @EmailSchema & @PasswordSchema
 */

export const emailSchema = string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" })
    .endsWith(".com", { message: "Invalid Email Address" });

export const passwordSchema = string({ required_error: `Password is required` })
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

export const SignUpSchema = object({
    name: string()
        .min(3, "Name is required")
        .max(255, "Name can't contain more than 255 Characters"),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: passwordSchema,
}).refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"],
});

export const SignInSchema = object({
    email: emailSchema,
    password: passwordSchema,
});

/**
 * @desc This sections contains all the validation schema for the blog.
 * It Include
 * - CategorySchema
 * - BlogSchema
 * - CommentSchema
 */
export const BlogSchema = object({
    title: string()
        .min(1, "Title is required")
        .max(255, "The title cann't contain more than 255 Characters"),
    image: string().min(1, "Image is required"),
    shortDescription: string({ message: "Short Description is required" })
        .min(40, "The short description must contains 40 Characters")
        .max(
            160,
            "The short description cann't contain more than 160 Characters"
        ),
    content: string(),
    published: boolean().default(false),
    isFeatured: boolean().default(false),
    category: string().min(1, "Category is required"),
});

export const CategorySchema = object({
    name: string({ message: "Name is required" }).min(3).max(255),
    color: string().min(1, "Color is required."),
    description: string().min(3).max(255),
});

export const BlogCommentSchema = object({
    blogSlug: string().min(1, "Blog is required"),
    content: string().min(1, "Comment is required"),
});
