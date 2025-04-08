const { ZodError } = require("zod");
const { HTTP_STATUS } = require("../constants/http.config");
const { AppError } = require("../exceptions/errors.exceptions");
const { JsonWebTokenError } = require("jsonwebtoken");
const { MulterError } = require("multer");
const { ERROR_CODE } = require("../constants/error-code");

const formatZod = (res, error) => {
    let errors = {};

    error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
    });
    return res.status(HTTP_STATUS.BAD_REQUEST).send({
        status: false,
        errors,
    });
};

const ErrorHandler = (error, req, res, next) => {
    console.log(`Error occured on path ${req.path}`, error);
    if (error instanceof SyntaxError) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: false,
            message: "Invalid JSON Data passed. Please check your request body",
        });
    }

    if (error instanceof ZodError) {
        formatZod(res, error);
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: false,
            message: error.message,
            errorCode: error.errorCode,
        });
    }

    if (error instanceof MulterError) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: false,
            error: error.message,
        });
    }

    if (error instanceof JsonWebTokenError) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: false,
            message: "Invalid Token",
        });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Something went wrong.",
    });
};

module.exports = { ErrorHandler };
