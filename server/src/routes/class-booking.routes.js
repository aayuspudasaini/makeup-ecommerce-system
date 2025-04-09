const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const {
    ClassBookingController,
} = require("../controllers/class-booking.controller");
const classRoutes = Router();

classRoutes
    .route("/")
    .get(asyncHandler(ClassBookingController.getAll))
    .post(asyncHandler(ClassBookingController.create));

classRoutes
    .route("/:id")
    .get(asyncHandler(ClassBookingController.getById))
    .patch(asyncHandler(ClassBookingController.update))
    .delete(asyncHandler(ClassBookingController.remove));

module.exports = classRoutes;
