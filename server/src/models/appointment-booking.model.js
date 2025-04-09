const mongoose = require("mongoose");

const appointmentBookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
        },

        makeupStyle: {
            type: String,
            enum: [
                "Bridal",
                "Everyday Makeup",
                "Party Look",
                "Professional Makeup",
                "Custom",
            ],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const AppointmentBooking = mongoose.model(
    "AppointmentBooking",
    appointmentBookingSchema
);

module.exports = AppointmentBooking;
