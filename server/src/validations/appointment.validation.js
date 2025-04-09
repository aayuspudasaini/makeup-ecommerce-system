const { object, string, z } = require("zod");
const { emailSchema } = require("./global.validation");

const appointmentBookingSchema = object({
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
    preferredDateTime: string().min(1, "Date and Time is required"),
});

const scheduleValidation = z.object({
    preferredDateTime: string().min(1, "Date and Time is required"),
    status: z.enum(["pending", "not confirmed", "confirmed"], {
        errorMap: () => ({
            message: "status must be pending,not confirmed or confirmed",
        }),
    }),
});

module.exports = { appointmentBookingSchema, scheduleValidation };
