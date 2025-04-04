const { bookingSchema } = require("../validations/booking.validation");
const { BookingService } = require("../services/booking.services");
const { successResponse } = require("../utils/success.response");
const { HTTP_STATUS } = require("../constants/http.config");

async function getBooking(req,res,next){
    const bookings = await BookingService.findAll();
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
        const validatedData = bookingSchema.parse(req.body);

        // Pass the validated data to the service layer
        const newBooking = await BookingService.create(validatedData);

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