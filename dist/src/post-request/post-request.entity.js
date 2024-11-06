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
exports.PostRequest = exports.PostRequestStatus = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../common");
const class_validator_1 = require("class-validator");
const post_entity_1 = require("../post/post.entity");
const university_entity_1 = require("../university/university.entity");
var PostRequestStatus;
(function (PostRequestStatus) {
    PostRequestStatus[PostRequestStatus["Pending"] = 0] = "Pending";
    PostRequestStatus[PostRequestStatus["Accepted"] = 1] = "Accepted";
    PostRequestStatus[PostRequestStatus["Rejected"] = 2] = "Rejected";
})(PostRequestStatus || (exports.PostRequestStatus = PostRequestStatus = {}));
let PostRequest = class PostRequest extends common_1.BaseEntity {
};
exports.PostRequest = PostRequest;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], PostRequest.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], PostRequest.prototype, "university_receiver_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: PostRequestStatus.Pending }),
    __metadata("design:type", Number)
], PostRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], PostRequest.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: '' }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], PostRequest.prototype, "linkPost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.postRequest),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", post_entity_1.Post)
], PostRequest.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => university_entity_1.University, (university) => university.postRequest),
    (0, typeorm_1.JoinColumn)({ name: 'university_receiver_id' }),
    __metadata("design:type", university_entity_1.University)
], PostRequest.prototype, "university", void 0);
exports.PostRequest = PostRequest = __decorate([
    (0, typeorm_1.Entity)()
], PostRequest);
//# sourceMappingURL=post-request.entity.js.map