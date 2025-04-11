const Order = require("../models/order.model");
const { BadRequestException } = require("../exceptions/errors.exceptions");

const paymentService = {
    // Process a payment for an order
    processPayment: async (orderId, paymentDetails) => {
        if (!orderId || !paymentDetails) {
            throw new BadRequestException("Order ID and payment details are required");
        }

        const order = await Order.findById(orderId);
        if (!order) {
            throw new BadRequestException("Order not found");
        }

        // Simulate payment processing (replace this with actual payment gateway logic)
        const paymentResult = {
            id: "PAYMENT12345", // Example payment ID
            status: "COMPLETED",
            update_time: new Date().toISOString(),
            email_address: paymentDetails.email,
        };

        // Update the order with payment details
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = paymentResult;

        return await order.save();
    },

    // Get payment details for an order
    getPaymentDetails: async (orderId) => {
        if (!orderId) {
            throw new BadRequestException("Order ID is required");
        }

        const order = await Order.findById(orderId);
        if (!order) {
            throw new BadRequestException("Order not found");
        }

        if (!order.isPaid) {
            throw new BadRequestException("Payment has not been made for this order");
        }

        return order.paymentResult;
    },
};

module.exports = { paymentService };