const mongoose = require("mongoose");

const classBookingModel = new mongoose.Schema(
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
        experience: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            required: true,
        },
        shift: {
            type: String,
            enum: ["Morning", "Day", "Evening"],
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
    },
    { timestamps: true }
);

const ClassBooking = mongoose.model("classBooking", classBookingModel);

module.exports = ClassBooking;
