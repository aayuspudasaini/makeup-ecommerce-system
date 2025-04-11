const { HTTP_STATUS } = require("../constants/http.config");
const { paymentService } = require("../services/payment.service");
const { successResponse } = require("../utils/success.response");

async function processPayment(req, res, next) {
    try {
        const { orderId, paymentDetails } = req.body;

        const data = await paymentService.processPayment(orderId, paymentDetails);

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            data,
            "Payment processed successfully"
        );
    } catch (error) {
        next(error); // Pass errors to the global error handler
    }
}

async function getPaymentDetails(req, res, next) {
    try {
        const { orderId } = req.params;

        const data = await paymentService.getPaymentDetails(orderId);

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            data,
            "Payment details fetched successfully"
        );
    } catch (error) {
        next(error); // Pass errors to the global error handler
    }
}

module.exports.paymentController = {
    processPayment,
    getPaymentDetails,
};