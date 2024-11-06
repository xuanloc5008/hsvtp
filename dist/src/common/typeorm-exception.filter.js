"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let TypeORMExceptionFilter = class TypeORMExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const message = exception.message;
        if (message.includes('duplicate key value violates unique constraint')) {
            response.status(409).json({
                statusCode: 409,
                message: 'Duplicate key value violates unique constraint',
                error: 'Conflict'
            });
        }
        else {
            response
                .status(500)
                .json({
                statusCode: 500,
                message: 'Internal server error',
                error: 'Internal Server Error'
            });
        }
    }
};
exports.TypeORMExceptionFilter = TypeORMExceptionFilter;
exports.TypeORMExceptionFilter = TypeORMExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], TypeORMExceptionFilter);
//# sourceMappingURL=typeorm-exception.filter.js.map