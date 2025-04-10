const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const { userController } = require("../controllers/user.controller");
const { identification } = require("../middlewares/identification");

const userRoute = Router();

userRoute.route("/register").post(asyncHandler(userController.registerUser));

userRoute.route("/login").post(asyncHandler(userController.loginUser));

userRoute
    .route("/logout")
    .post(identification, asyncHandler(userController.logoutUser));

userRoute.route("/users").get(asyncHandler(userController.getAllUser));

userRoute.route("/users/:id").delete(asyncHandler(userController.deleteUser));

module.exports = userRoute;
