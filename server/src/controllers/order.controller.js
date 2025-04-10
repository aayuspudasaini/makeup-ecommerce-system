const { HTTP_STATUS } = require("../constants/http.config");
const { orderService } = require("../services/order.services");
const { successResponse } = require("../utils/success.response");

async function createOrder(req, res, next) {
    const body = req.body;

    const data = await orderService.create(body);

    successResponse(
        res,
        HTTP_STATUS.CREATED,
        true,
        data,
        "Order created successfully"
    );
}

async function getOrderById(req, res, next) {
    const { id } = req.params;

    const data = await orderService.findById(id);

    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Order fetched successfully"
    );
}

async function getOrdersByUser(req, res, next) {
    const { userId } = req.params;

    const data = await orderService.findByUser(userId);

    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Orders fetched successfully for user"
    );
}

async function getAllOrders(req, res, next) {
    const data = await orderService.findAll();

    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "All orders fetched successfully"
    );
}

async function updatePaymentStatus(req, res, next) {
    const { id } = req.params;
    const { paymentResult } = req.body;

    const data = await orderService.updatePaymentStatus(id, paymentResult);

    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Payment status updated successfully"
    );
}

async function updateDeliveryStatus(req, res, next) {
    const { id } = req.params;

    const data = await orderService.updateDeliveryStatus(id);

    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Delivery status updated successfully"
    );
}

async function deleteOrder(req, res, next) {
    const { id } = req.params;

    await orderService.remove(id);

    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        null,
        "Order deleted successfully"
    );
}

module.exports.orderController = {
    createOrder,
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    updatePaymentStatus,
    updateDeliveryStatus,
    deleteOrder,
};