import { ErrorCode } from "../common/enum/error-code-enum";
import { HTTP_STATUS, HTTP_STATUS_CODE } from "../config/http.config";
import { AppError } from "./app-error";

export class UnAuthorizedException extends AppError {
   constructor(message = "Unauthorized", errorCode) {
      super(
         message,
         HTTP_STATUS.UNAUTHORIZED,
         errorCode || ErrorCode.AUTH_UNAUTHORIZED_ACCESS
      );
   }
}

export class BadRequestException extends AppError {
   constructor(message = "Not Found", errorCode) {
      super(message, HTTP_STATUS.BAD_REQUEST, errorCode);
   }
}

export class NotFoundException extends AppError {
   constructor(message = "Not Found", errorCode) {
      super(
         message,
         HTTP_STATUS.NOT_FOUND,
         errorCode || ErrorCode.RESOURCE_NOT_FOUND
      );
   }
}

export class InternalServerException extends AppError {
   constructor(message = "Internal Server Error", errorCode) {
      super(
         message,
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         errorCode || ErrorCode.INTERNAL_SERVER_ERROR
      );
   }
}

export class ConflictException extends AppError {
   constructor(message, errorCode) {
      super(message, HTTP_STATUS.CONFLICT, errorCode);
   }
}

export class HttpException extends AppError {
   constructor(message = "Http Exception Error", statusCode, errorCode) {
      super(message, statusCode, errorCode);
   }
}
