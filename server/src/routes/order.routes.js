const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const {orderController} = require("../controllers/order.controller")

const orderRoute = Router();

orderRoute.route("/order")
    .get(asyncHandler(orderController.getAllOrders))
    .post(asyncHandler(orderController.createOrder))

orderRoute.route("/order/:id")
    .get(asyncHandler(orderController.getOrderById));

// Route to get orders by user ID
orderRoute.route("/order/user/:userId")
    .get(asyncHandler(orderController.getOrdersByUser));

module.exports = orderRoute;