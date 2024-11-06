"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRequestModule = void 0;
const common_1 = require("@nestjs/common");
const post_request_controller_1 = require("./post-request.controller");
const post_request_service_1 = require("./post-request.service");
const typeorm_1 = require("@nestjs/typeorm");
const post_request_entity_1 = require("./post-request.entity");
let PostRequestModule = class PostRequestModule {
};
exports.PostRequestModule = PostRequestModule;
exports.PostRequestModule = PostRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([post_request_entity_1.PostRequest])],
        controllers: [post_request_controller_1.PostRequestController],
        providers: [post_request_service_1.PostRequestService]
    })
], PostRequestModule);
//# sourceMappingURL=post-request.module.js.map