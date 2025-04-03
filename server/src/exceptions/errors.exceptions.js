const { ERROR_CODE } = require("../constants/error-code");
const { HTTP_STATUS } = require("../constants/http.config");

class AppError extends Error {
    constructor(
        message,
        statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        errorCode
    ) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class UnAuthorizedException extends AppError {
    constructor(message = "Unauthorized", errorCode) {
        super(
            message,
            HTTP_STATUS.UNAUTHORIZED,
            errorCode || ERROR_CODE.AUTH_UNAUTHORIZED_ACCESS
        );
    }
}

class BadRequestException extends AppError {
    constructor(message = "Not Found", errorCode) {
        super(message, HTTP_STATUS.BAD_REQUEST, errorCode);
    }
}

class NotFoundException extends AppError {
    constructor(message = "Not Found", errorCode) {
        super(
            message,
            HTTP_STATUS.NOT_FOUND,
            errorCode || ERROR_CODE.RESOURCE_NOT_FOUND
        );
    }
}

class InternalServerException extends AppError {
    constructor(message = "Internal Server Error", errorCode) {
        super(
            message,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR
        );
    }
}

class ConflictException extends AppError {
    constructor(message, errorCode) {
        super(message, HTTP_STATUS.CONFLICT, errorCode);
    }
}

class HttpException extends AppError {
    constructor(message = "Http Exception Error", statusCode, errorCode) {
        super(message, statusCode, errorCode);
    }
}

module.exports = {
    AppError,
    BadRequestException,
    NotFoundException,
    ConflictException,
    InternalServerException,
    HttpException,
    UnAuthorizedException,
};
