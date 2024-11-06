import { HttpException, HttpStatus } from '@nestjs/common';
export type ExceptionData = {
    message: string;
    data?: any;
    statusCode: number;
};
export declare class Exception extends HttpException {
    private readonly exceptionData;
    constructor(statusCode: HttpStatus, message: string, data?: any);
}
export declare class ExceptionEntityNotFound extends Exception {
    constructor(message: string, data?: any);
}
export declare class ExceptionBadRequest extends Exception {
    constructor(message: string, data?: any);
}
