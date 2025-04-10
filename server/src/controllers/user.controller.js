const { userService } = require("../services/user.services");
const { successResponse } = require("../utils/success.response");
const { HTTP_STATUS } = require("../constants/http.config");
const {
    registerSchema,
    loginSchema,
} = require("../validations/user.validation");
const { config } = require("../config/app.config");
const jwt = require("jsonwebtoken");
const {
    clearAuthenticationCookies,
    setAuthenticationCookie,
} = require("../utils/cookie");

const userController = {
    getAllUser: async (req, res, next) => {
        const data = await userService.findAll();

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            data,
            "Data fetched successfully"
        );
    },

    // Handle user registration
    registerUser: async (req, res, next) => {
        // Validate the request body
        const validatedData = registerSchema.parse({ ...req.body });

        // Create a new user
        const newUser = await userService.register(validatedData);

        // Send success response
        successResponse(
            res,
            HTTP_STATUS.CREATED,
            true,
            newUser,
            "User registered successfully"
        );
    },

    // Handle user login
    loginUser: async (req, res, next) => {
        // Validate the request body
        const validatedData = loginSchema.parse({ ...req.body });

        const { user, access_token, refresh_token } =
            await userService.login(validatedData);

        // setting cookie
        setAuthenticationCookie(res, access_token, refresh_token);

        // Send success response
        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            { user, access_token, refresh_token },
            "User Logged in successfully"
        );
    },

    logoutUser: async (req, res, next) => {
        // Clear the token from cookies (if stored in cookies)
        clearAuthenticationCookies();

        // Send success response
        successResponse(res, HTTP_STATUS.OK, true, null, "Logout successful");
    },
};

module.exports = { userController };
