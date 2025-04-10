const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const {orderController} = require("../controllers/order.controller")

const orderRoute = Router();

orderRoute.route("/order")
    .get(asyncHandler(orderController.getAllOrders))
    .post(asyncHandler(orderController.createOrder))

module.exports = orderRoute;