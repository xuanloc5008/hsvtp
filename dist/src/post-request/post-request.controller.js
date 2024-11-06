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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRequestController = void 0;
const common_1 = require("@nestjs/common");
const post_request_service_1 = require("./post-request.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_guards_1 = require("../user/guards/jwt.guards");
const role_guards_1 = require("../user/guards/role.guards");
const decorator_1 = require("../common/decorator");
const user_entity_1 = require("../user/user.entity");
const pageOption_dto_1 = require("../common/dtos/pageOption.dto");
const typeorm_exception_filter_1 = require("../common/typeorm-exception.filter");
const updateRequestDto_1 = require("./dtos/updateRequestDto");
let PostRequestController = class PostRequestController {
    constructor(postRequestService) {
        this.postRequestService = postRequestService;
    }
    async createPostRequest(id, user, listReceiverId) {
        return this.postRequestService.createPostRequest(id, listReceiverId, user);
    }
    async updatePostRequest(id, data, user) {
        return this.postRequestService.UpdatePostRequest(id, data, user);
    }
    async deletePostRequest(id, user) {
        return this.postRequestService.DeletePostRequest(id, user);
    }
    async getAllPostRequestForReceiver(pageOption, user) {
        return this.postRequestService.getAllPostRequestReceiver(pageOption, user);
    }
    async getAllPostRequest(pageOption, user) {
        return this.postRequestService.getAllPostRequest(pageOption, user);
    }
};
exports.PostRequestController = PostRequestController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, swagger_1.ApiOperation)({ summary: 'Create post request - only role university manager can create post request' }),
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Array]),
    __metadata("design:returntype", Promise)
], PostRequestController.prototype, "createPostRequest", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, swagger_1.ApiOperation)({ summary: 'Update post-request - only university manager received post-request can update post request' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateRequestDto_1.updateRequestDto, Object]),
    __metadata("design:returntype", Promise)
], PostRequestController.prototype, "updatePostRequest", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, swagger_1.ApiOperation)({ summary: 'Delete post-request - Only university manage this post_request can delete' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostRequestController.prototype, "deletePostRequest", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, swagger_1.ApiOperation)({ summary: 'Get all post-request for receiver - Role: UniversityManager' }),
    (0, common_1.Get)('receiver'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionDto, Object]),
    __metadata("design:returntype", Promise)
], PostRequestController.prototype, "getAllPostRequestForReceiver", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, swagger_1.ApiOperation)({ summary: 'Get all post-request for sender - Role: UniversityManager' }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionDto, Object]),
    __metadata("design:returntype", Promise)
], PostRequestController.prototype, "getAllPostRequest", null);
exports.PostRequestController = PostRequestController = __decorate([
    (0, common_1.Controller)('post-request'),
    (0, swagger_1.ApiTags)('Post Request'),
    (0, common_1.UseFilters)(typeorm_exception_filter_1.TypeORMExceptionFilter),
    __metadata("design:paramtypes", [post_request_service_1.PostRequestService])
], PostRequestController);
//# sourceMappingURL=post-request.controller.js.map