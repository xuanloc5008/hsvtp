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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const pageOption_dto_1 = require("../common/dtos/pageOption.dto");
const jwt_guards_1 = require("../user/guards/jwt.guards");
const role_guards_1 = require("../user/guards/role.guards");
const decorator_1 = require("../common/decorator");
const user_entity_1 = require("../user/user.entity");
const postCreate_1 = require("./dtos/postCreate");
let PostController = class PostController {
    constructor(postservice) {
        this.postservice = postservice;
    }
    async createPost(data, user) {
        return this.postservice.createPost(data, user);
    }
    async updatePost(data, id, user) {
        return this.postservice.updatePost(data, id, user);
    }
    async deletePost(id, user) {
        return this.postservice.deletePost(id, user);
    }
    async getPost(id, user) {
        return this.postservice.getPost(id, user);
    }
    async listPost(pageOption, user) {
        return this.postservice.listPost(pageOption, user);
    }
};
exports.PostController = PostController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create post - only role university manager can create post' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The post has been successfully created.',
    }),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postCreate_1.postcreateDTO, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update post - only role university manager can update post' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The post has been successfully updated.',
        type: common_2.NewSuccessResponse
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the post to update',
        type: String,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Update post by ID - only role university manager can update post' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The post has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Post not found.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the post to update',
        type: String,
    }),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postCreate_1.postcreateDTO, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete post by ID - only role university manager can delete post' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The post has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Post not found.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the post to delete',
        type: String,
    }),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get post by ID - only role university manager can get post' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The post has been successfully retrieved.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Post not found.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the post to retrieve',
        type: String,
    }),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'List post - only role university manager can get the list of post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return list of post' }),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, decorator_1.Roles)(user_entity_1.Role.UniversityManager),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "listPost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    (0, swagger_1.ApiTags)('Post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map