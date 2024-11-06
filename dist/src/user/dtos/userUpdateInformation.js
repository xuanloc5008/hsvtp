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
exports.UserUpdateInformationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserUpdateInformationDto {
}
exports.UserUpdateInformationDto = UserUpdateInformationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'email',
        type: String,
        required: false,
        example: 'example@gmail.com',
    }),
    (0, class_validator_1.Length)(5, 30),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserUpdateInformationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'family Name',
        required: false,
        type: String,
        example: 'familyname user',
    }),
    (0, class_validator_1.Length)(2, 30),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserUpdateInformationDto.prototype, "familyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'given Name',
        required: false,
        type: String,
        example: 'name user',
    }),
    (0, class_validator_1.Length)(2, 30),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserUpdateInformationDto.prototype, "givenName", void 0);
//# sourceMappingURL=userUpdateInformation.js.map