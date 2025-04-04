const Booking = require("../models/booking.model");
const { slugify } = require("../utils/slugify");
const { BadRequestException } = require("../exceptions/errors.exceptions");

async function findAll() {
    // Fetch all bookings, sorted by creation date (newest first)
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return bookings;
}

async function create(data) {
    // Generate a slug from the full name
    const slug = slugify(data.fullName);

    // Check if a booking with the same slug and preferred date/time already exists
    const isExist = await Booking.exists({
        slug,
        preferredDateTime: data.preferredDateTime,
    });

    if (isExist) {
        throw new BadRequestException(
            "A booking with the same name and preferred date/time already exists."
        );
    }

    // Create a new booking
    const newBooking = await Booking.create({
        slug,
        ...data,
    });

    return newBooking;
}

async function findBySlug(slug) {
    // Find a booking by its slug
    const booking = await Booking.findOne({ slug });

    if (!booking) {
        throw new BadRequestException("Booking not found.");
    }

    return booking;
}

async function findById(id) {
    // Find a booking by its ID
    const booking = await Booking.findById(id);

    if (!booking) {
        throw new BadRequestException("Booking not found.");
    }

    return booking;
}

module.exports.BookingService = {
    findAll,
    create,
};