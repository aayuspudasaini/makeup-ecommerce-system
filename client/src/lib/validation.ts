import { object, string, boolean, z, any, enum as zodEnum } from "zod";

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

const fileSizeLimit = 10 * 1024 * 1024;

export const FileSchema = z
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
    .refine((file) => file.size <= fileSizeLimit, {
        message: "File size should not exceed 10MB",
    })
    .nullable();

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

export const categorySchema = object({
    name: string()
        .min(1, "Name is required")
        .max(16, "Name must be at least 16 characters long."),
    description: string().min(1, "Description is required"),
    image: any()
        .refine((file) => file?.length >= 1, { message: "Image is required." })
        .refine(
            (file) => file?.[0]?.size <= 10 * 1024 * 1024,
            "Max image size is 10MB."
        )
        .refine(
            (file) =>
                ["image/png", "image/jpeg", "image/jpg", "video/mp4"].includes(
                    file?.[0].type
                ),
            "Only .jpg, .jpeg, .png and mp4 formats are supported."
        ),
});

//     custom<FileList>()
//         .transform((file) => file.length > 0 && file.item(0))
//         .refine((file) => !file || (!!file && file?.length <= 10 * 1024 * 1024), {
//             message: "The file must be a maximum of 10MB.",
//         })
//         .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
//             message: "The file must be a maximum of 10MB.",
//         })
//         .refine((file) => !file ||
//             [
//                 "image/png",
//                 "image/jpeg",
//                 "image/jpg",
//                 "video/mp4"
//             ].includes(file.type),
//             { message: "Invalid file type. Only PNG, JPEG, JPG, or MP4 are allowed." })
// });

export const carouselSchema = object({
    title: string().min(1, "Title is required."),
    description: string().min(1, "Description is required."),
    type: z.enum(["image", "video"]),
    content: any(),
});

export const appointmentBookingSchema = object({
    name: string().min(1, "Name is required"),
    email: emailSchema,
    phone: string().regex(
        /^\+977(98|97)\d{8}$/g,
        "Please add a valid phone number"
    ),
    address: string().min(1, "Address is required"),
    makeupStyle: z.enum([
        "Bridal",
        "Everyday Makeup",
        "Party Look",
        "Professional Makeup",
        "Custom",
    ]),
    preferredDateTime: z.date({
        required_error: "Preferred date and time is required",
    }),
});

export const classBookingSchema = object({
    name: string().min(1, "Name is required"),
    email: emailSchema,
    phone: string().regex(
        /^\+977(98|97)\d{8}$/g,
        "Please add a valid phone number"
    ),
    experience: zodEnum(["Beginner", "Intermediate", "Advanced"], {
        errorMap: () => ({
            message:
                "Experience level must be Beginner, Intermediate, or Advanced",
        }),
    }),
    makeupStyle: z.enum([
        "Bridal",
        "Everyday Makeup",
        "Party Look",
        "Professional Makeup",
        "Custom",
    ], {
        errorMap: () => ({
            message: "Makeup style must be Bridal,Everyday Makeup,Party Look, Professional Makeup or Custom"
        })
    }),
    shift: zodEnum(["Morning", "Day", "Evening"], {
        errorMap: () => ({
            message:
                "Shift must be Morning, Day, or Evening",
        }),
    })
});
