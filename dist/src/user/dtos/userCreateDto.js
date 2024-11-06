"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserCreateDTO {
}
exports.UserCreateDTO = UserCreateDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 30),
    (0, swagger_1.ApiProperty)({
        example: 'klay12343431',
        description: 'enter your username',
        required: true,
    }),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 30),
    (0, swagger_1.ApiProperty)({
        example: 'nbafinal2016',
        description: 'enter your password',
        required: true,
    }),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(6, 30),
    (0, swagger_1.ApiProperty)({
        example: 'abcdxyz@gmail.com',
        description: 'enter your email',
        required: true,
    }),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 30),
    (0, swagger_1.ApiProperty)({
        example: 'Thompson',
        description: 'enter your family name',
        required: true,
    }),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "familyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 30),
    (0, swagger_1.ApiProperty)({
        example: 'Klay',
        description: 'enter your given name',
        required: true,
    }),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "givenName", void 0);
//# sourceMappingURL=userCreateDto.js.map