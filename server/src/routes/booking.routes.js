const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const { bookController } = require("../controllers/booking.controller");
const bookroute = Router();

bookroute.get("/", asyncHandler(bookController.getBooking));
bookroute.post("/submit", asyncHandler(bookController.createBooking));

module.exports = bookroute;
