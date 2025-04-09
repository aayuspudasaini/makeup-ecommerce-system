const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const {
    AppointmentBookingController,
} = require("../controllers/appointment-booking.controller");
const appointment = Router();

appointment
    .route("/")
    .get(asyncHandler(AppointmentBookingController.getAll))
    .post(asyncHandler(AppointmentBookingController.create));

appointment
    .route("/:id")
    .get(asyncHandler(AppointmentBookingController.getById))
    .patch(asyncHandler(AppointmentBookingController.update))
    .delete(asyncHandler(AppointmentBookingController.remove));

module.exports = appointment;
