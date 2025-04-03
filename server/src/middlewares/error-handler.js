const { HTTP_STATUS } = require("../config/http.config");
const { AppError } = require("../exceptions/app-error");

module.exports.ErrorHandler = (error, req, res, next) => {
   console.log(`Error occured on path ${req.path}`, error);
   if (error instanceof SyntaxError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
         status: false,
         message: "Invalid JSON Data passed. Please check your request body",
      });
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
