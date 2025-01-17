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
exports.UniversityCreate = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UniversityCreate {
}
exports.UniversityCreate = UniversityCreate;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 100),
    (0, swagger_1.ApiProperty)({ description: 'university name' }),
    __metadata("design:type", String)
], UniversityCreate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'university shortname', example: "HCMUT" }),
    __metadata("design:type", String)
], UniversityCreate.prototype, "shortName", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.avatar !== null && o.avatar !== undefined),
    (0, swagger_1.ApiProperty)({ description: "Url Of University Avatar" }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UniversityCreate.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'University Description' }),
    (0, class_validator_1.Length)(1, 5000),
    __metadata("design:type", String)
], UniversityCreate.prototype, "description", void 0);
//# sourceMappingURL=universityCreate.js.map