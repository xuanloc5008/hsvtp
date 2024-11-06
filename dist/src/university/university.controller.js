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
exports.UniversityController = void 0;
const common_1 = require("@nestjs/common");
const university_service_1 = require("./university.service");
const dtos_1 = require("./dtos");
const pageOption_dto_1 = require("../common/dtos/pageOption.dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const university_entity_1 = require("./university.entity");
const jwt_guards_1 = require("../user/guards/jwt.guards");
let UniversityController = class UniversityController {
    constructor(universityService) {
        this.universityService = universityService;
    }
    async createUniversity(data) {
        return this.universityService.createUniversity(data);
    }
    async updateUniversity(id, data) {
        return this.universityService.updateUniversity(id, data);
    }
    async deleteUniversity(id) {
        return this.universityService.deleteUniversity(id);
    }
    listUniversity(pageOption) {
        return this.universityService.listUniversity(pageOption);
    }
};
exports.UniversityController = UniversityController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'create university' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'create university successfully',
        type: university_entity_1.University,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UniversityCreate]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "createUniversity", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'update university' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'update university successfully' }),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UniversityUpdate]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "updateUniversity", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete university' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete university successfully',
        type: common_2.NewSuccessResponse,
    }),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "deleteUniversity", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'List university' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return list of university' }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guards_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionDto]),
    __metadata("design:returntype", void 0)
], UniversityController.prototype, "listUniversity", null);
exports.UniversityController = UniversityController = __decorate([
    (0, common_1.Controller)('university'),
    (0, swagger_1.ApiTags)('University'),
    __metadata("design:paramtypes", [university_service_1.UniversityService])
], UniversityController);
//# sourceMappingURL=university.controller.js.map