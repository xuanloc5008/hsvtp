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
exports.User = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../common");
const class_transformer_1 = require("class-transformer");
const university_entity_1 = require("../university/university.entity");
var Role;
(function (Role) {
    Role["SuperAdmin"] = "SuperAdmin";
    Role["Admin"] = "Admin";
    Role["UniversityManager"] = "UniversityManager";
    Role["User"] = "User";
})(Role || (exports.Role = Role = {}));
let User = class User extends common_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "university_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'username', type: String }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'password', type: String }),
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'email', type: String }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'familyName', type: String }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "familyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'givenName', type: String }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "givenName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, array: true, default: [Role.User] }),
    __metadata("design:type", Array)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => university_entity_1.University, (university) => university.user, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'university_id' }),
    __metadata("design:type", university_entity_1.University)
], User.prototype, "university", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map