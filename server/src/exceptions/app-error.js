const { HTTP_STATUS } = require("../config/http.config");

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

module.exports = new AppError();
