const { string, object, array, date, enum: zodEnum } = require("zod");

const bookingSchema = object({
    fullName: string()
        .min(1, "Full name is required")
        .max(100, "Full name must not exceed 100 characters"),
    email: string().email("Invalid email address").min(1, "Email is required"),
    phone: string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must not exceed 15 digits"),
    preferredDateTime: date({
        required_error: "Preferred date and time is required",
    }),
    experienceLevel: zodEnum(["Beginner", "Intermediate", "Advanced"], {
        errorMap: () => ({
            message:
                "Experience level must be Beginner, Intermediate, or Advanced",
        }),
    }),
    makeupStyle: array(
        zodEnum(
            [
                "Bridal",
                "Everyday Makeup",
                "Party Look",
                "Professional Makeup",
                "Custom",
            ],
            {
                errorMap: () => ({
                    message:
                        "Makeup style must be one of the predefined options",
                }),
            }
        )
    ).nonempty("At least one makeup style must be selected"),
});

module.exports = { bookingSchema };
