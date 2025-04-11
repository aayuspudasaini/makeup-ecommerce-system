const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const { paymentController } = require("../controllers/payment.controller");

const paymentRoute = Router();

paymentRoute.post(
    "/process",
    asyncHandler(paymentController.processPayment) // Process a payment
);

paymentRoute.get(
    "/details/:orderId",
    asyncHandler(paymentController.getPaymentDetails) // Get payment details
);

module.exports = paymentRoute;