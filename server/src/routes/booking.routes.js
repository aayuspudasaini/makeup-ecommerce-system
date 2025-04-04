const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const bookroute = Router();
const {bookController} = require("../controllers/booking.controller")

bookroute.get("/",asyncHandler(bookController.getBooking));
bookroute.post("/submit", asyncHandler(bookController.createBooking));

module.exports = bookroute;