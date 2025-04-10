const Order = require("../models/order.model");
const { BadRequestException } = require("../exceptions/errors.exceptions");

const orderService = {
    // Create a new order
    create: async (data) => {
        if (!data.user || !data.orderItems || !data.shippingAddress || !data.totalPrice) {
            throw new BadRequestException("User, order items, shipping address, and total price are required");
        }
        return await Order.create(data);
    },

    // Find an order by ID
    findById: async (id) => {
        if (!id) {
            throw new BadRequestException("Order ID is required");
        }
        const order = await Order.findById(id).populate("user").populate("orderItems.product");
        if (!order) {
            throw new BadRequestException("Order not found");
        }
        return order;
    },

    // Find all orders
    findAll: async () => {
        return await Order.find().populate("user").populate("orderItems.product");
    },

    // Find orders by user ID
    findByUser: async (userId) => {
        if (!userId) {
            throw new BadRequestException("User ID is required");
        }
        return await Order.find({ user: userId }).populate("orderItems.product");
    },

    // Update payment status of an order
    updatePaymentStatus: async (id, paymentResult) => {
        if (!id || !paymentResult) {
            throw new BadRequestException("Order ID and payment result are required");
        }
        const order = await Order.findById(id);
        if (!order) {
            throw new BadRequestException("Order not found");
        }
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = paymentResult;
        return await order.save();
    },

    // Update delivery status of an order
    updateDeliveryStatus: async (id) => {
        if (!id) {
            throw new BadRequestException("Order ID is required");
        }
        const order = await Order.findById(id);
        if (!order) {
            throw new BadRequestException("Order not found");
        }
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        return await order.save();
    },

    // Remove an order by ID
    remove: async (id) => {
        if (!id) {
            throw new BadRequestException("Order ID is required");
        }
        const order = await Order.findById(id);
        if (!order) {
            throw new BadRequestException("Order not found");
        }
        return await Order.findByIdAndDelete(id);
    },
};

module.exports = { orderService };