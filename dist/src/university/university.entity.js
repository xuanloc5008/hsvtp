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
exports.University = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../common/base_entity");
const post_entity_1 = require("../post/post.entity");
const post_request_entity_1 = require("../post-request/post-request.entity");
const user_entity_1 = require("../user/user.entity");
let University = class University extends base_entity_1.BaseEntity {
};
exports.University = University;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'University Name',
        example: 'Ho Chi Minh University of Technology',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], University.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'University shortname', example: 'HCMUT' }),
    __metadata("design:type", String)
], University.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'University Description' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], University.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Url Of University Avatar' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], University.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.university),
    __metadata("design:type", Array)
], University.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_request_entity_1.PostRequest, (postRequest) => postRequest.university),
    __metadata("design:type", Array)
], University.prototype, "postRequest", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.university),
    __metadata("design:type", Array)
], University.prototype, "user", void 0);
exports.University = University = __decorate([
    (0, typeorm_1.Entity)()
], University);
//# sourceMappingURL=university.entity.js.map