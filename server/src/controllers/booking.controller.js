const { bookingSchema } = require("../validations/booking.validation");
const { bookingService } = require("../services/booking.service");
const { successResponse } = require("../utils/success.response");
const { HTTP_STATUS } = require("../constants/http.config");
const { BookingService } = require("../services/booking.service");

async function getBooking(req, res, next) {
    const bookings = await bookingService.findAll();
    // Send a success response with the bookings
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        bookings,
        "Bookings fetched successfully"
    );
}

async function createBooking(req, res, next) {
    // Validate the request body
    const validatedData = bookingSchema.parse({ ...req.body });

    // Pass the validated data to the service layer
    const newBooking = await bookingService.create(validatedData);

    // Send a success response
    successResponse(
        res,
        HTTP_STATUS.CREATED,
        true,
        newBooking,
        "Booking created successfully"
    );
}

module.exports.bookController = {
    createBooking,
    getBooking,
};
