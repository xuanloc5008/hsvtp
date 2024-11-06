"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const ormconfig_1 = require("../ormconfig");
const config_1 = require("@nestjs/config");
const university_module_1 = require("./university/university.module");
const s3_service_1 = require("./s3/s3.service");
const s3_module_1 = require("./s3/s3.module");
const post_module_1 = require("./post/post.module");
const post_request_module_1 = require("./post-request/post-request.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.dataSourceOptions),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            user_module_1.UserModule,
            university_module_1.UniversityModule,
            s3_module_1.S3Module,
            post_module_1.PostModule,
            post_request_module_1.PostRequestModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, s3_service_1.S3Service],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map