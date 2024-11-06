"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionBadRequest = exports.ExceptionEntityNotFound = exports.Exception = void 0;
const common_1 = require("@nestjs/common");
class Exception extends common_1.HttpException {
    constructor(statusCode, message, data) {
        super(message, statusCode);
        this.exceptionData = {
            statusCode,
            message,
            data,
        };
    }
}
exports.Exception = Exception;
class ExceptionEntityNotFound extends Exception {
    constructor(message, data) {
        super(common_1.HttpStatus.NOT_FOUND, message, data);
    }
}
exports.ExceptionEntityNotFound = ExceptionEntityNotFound;
class ExceptionBadRequest extends Exception {
    constructor(message, data) {
        super(common_1.HttpStatus.BAD_REQUEST, message, data);
    }
}
exports.ExceptionBadRequest = ExceptionBadRequest;
//# sourceMappingURL=app_error.js.map