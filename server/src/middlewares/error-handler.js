const { ZodError } = require("zod");
const { HTTP_STATUS } = require("../constants/http.config");
const { AppError } = require("../exceptions/errors.exceptions");

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

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Something went wrong.",
    });
};

module.exports = { ErrorHandler };
