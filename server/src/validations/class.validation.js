const { string, object, array, date, enum: zodEnum } = require("zod");
const { phoneNumberSchema, emailSchema } = require("./global.validation");

const classBookingSchema = object({
    name: string()
        .min(1, "Full name is required")
        .max(100, "Full name must not exceed 100 characters"),
    email: emailSchema,
    phone: phoneNumberSchema,
    shift: zodEnum(["Morning", "Day", "Evening"], {
        errorMap: () => ({
            message: "Shift must be Morning, Day, or Evening",
        }),
    }),
    experience: zodEnum(["Beginner", "Intermediate", "Advanced"], {
        errorMap: () => ({
            message:
                "Experience level must be Beginner, Intermediate, or Advanced",
        }),
    }),
    makeupStyle: zodEnum(
        [
            "Bridal",
            "Everyday Makeup",
            "Party Look",
            "Professional Makeup",
            "Custom",
        ],
        {
            errorMap: () => ({
                message: "Makeup style must be one of the predefined options",
            }),
        }
    ),
});

module.exports = { classBookingSchema };
