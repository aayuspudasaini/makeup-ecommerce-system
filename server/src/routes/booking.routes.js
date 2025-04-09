const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");

const booking = Router();

booking
    .route("/")
    .get(asyncHandler(BookingCo.getAll))
    .post(asyncHandler(AppointmentBookingController.create));

appointment
    .route("/:id")
    .get(asyncHandler(AppointmentBookingController.getById))
    .delete(asyncHandler(AppointmentBookingController.remove));

module.exports = appointment;
