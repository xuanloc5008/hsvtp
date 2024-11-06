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
exports.PageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pageMeta_dto_1 = require("./pageMeta.dto");
class PageDto {
    constructor(data, meta) {
        this.data = data;
        this.meta = meta;
    }
}
exports.PageDto = PageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "list data", isArray: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], PageDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "metadata", type: Number }),
    __metadata("design:type", pageMeta_dto_1.PageMetaDto)
], PageDto.prototype, "meta", void 0);
//# sourceMappingURL=page.dto.js.map