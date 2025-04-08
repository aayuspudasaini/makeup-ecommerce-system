const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
    preferredDateTime: {
        type: Date,
        required: true,
    },
    experienceLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
    },
    makeupStyle: {
        type: [String],
        enum: [
            "Bridal",
            "Everyday Makeup",
            "Party Look",
            "Professional Makeup",
            "Custom",
        ],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
