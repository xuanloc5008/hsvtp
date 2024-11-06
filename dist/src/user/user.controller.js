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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const dtos_1 = require("./dtos");
const jwt_guards_1 = require("./guards/jwt.guards");
const user_entity_1 = require("./user.entity");
const swagger_1 = require("@nestjs/swagger");
const pageOption_dto_1 = require("../common/dtos/pageOption.dto");
const decorator_1 = require("../common/decorator");
const role_guards_1 = require("./guards/role.guards");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(data) {
        return this.userService.createUser(data);
    }
    async Login(data) {
        return this.userService.Login(data);
    }
    async GetMe(user) {
        return this.userService.GetUserById(user.id);
    }
    async GetAllUser(pageOption) {
        return this.userService.GetAllUser(pageOption);
    }
    async ChangePassword(user, data) {
        return this.userService.ChangePassword(user.id, data);
    }
    async UpdateInformation(user, data) {
        return this.userService.UpdateInformation(user.id, data);
    }
    async Delete(id) {
        return this.userService.deleteUser(id);
    }
    async UpdateRoleUser(userId, role, user) {
        return this.userService.updateRoleUser(user.role, userId, role);
    }
    async CreateUniversityAccount(data, universityId) {
        return this.userService.CreateUniversityAccount(data, universityId);
    }
    async searchUser(familyName, lastName, university, role) {
        console.log(university);
        return this.userService.searchUsers(familyName, lastName, role, university);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create user' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The user has been successfully created.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserCreateDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserLoginDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Login", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard),
    (0, common_1.Get)('/profile'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return profile of yourself' }),
    __param(0, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all user' }),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, decorator_1.Roles)(user_entity_1.Role.Admin, user_entity_1.Role.SuperAdmin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetAllUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Change password' }),
    (0, common_1.Put)('/change-password'),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.UserChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ChangePassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update infor user' }),
    (0, common_1.Put)('/'),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.UserUpdateInformationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateInformation", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, example: 'uuid' }),
    (0, decorator_1.Roles)(user_entity_1.Role.Admin, user_entity_1.Role.SuperAdmin),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Delete", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard, role_guards_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'update role' }),
    (0, swagger_1.ApiBody)({
        isArray: true,
        description: `["${user_entity_1.Role.SuperAdmin}", "${user_entity_1.Role.Admin}",
                            "${user_entity_1.Role.UniversityManager}" , "${user_entity_1.Role.User}"]`,
    }),
    (0, common_1.Put)(':id/role'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateRoleUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'create accout University' }),
    (0, common_1.Post)('/account-university/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserCreateDTO, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "CreateUniversityAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search users by family name, last name, university, role' }),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('familyName')),
    __param(1, (0, common_1.Query)('lastName')),
    __param(2, (0, common_1.Query)('university')),
    __param(3, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map