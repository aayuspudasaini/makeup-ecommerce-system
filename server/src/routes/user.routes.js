const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const {userController} = require("../controllers/user.controller");

const userRoute = Router();

userRoute
    .route('/register')
    .post(asyncHandler(userController.registerUser));

userRoute
    .route('/login')
    .post(asyncHandler(userController.loginUser));

module.exports = userRoute;