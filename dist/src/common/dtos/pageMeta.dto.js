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
exports.PageMetaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PageMetaDto {
    constructor(totalItems, pageOption) {
        this.page = pageOption.page;
        this.take = pageOption.take;
        this.totalItems = totalItems;
        this.totalPages = Math.ceil(totalItems / this.take);
        this.next = this.page < this.totalPages;
        this.previous = this.page > 1;
    }
}
exports.PageMetaDto = PageMetaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "page numer", default: 1, minimum: 1, type: Number }),
    __metadata("design:type", Number)
], PageMetaDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)({ description: "number of items take per page", default: 10, minimum: 1, type: Number }),
    __metadata("design:type", Number)
], PageMetaDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "total items", type: Number }),
    __metadata("design:type", Number)
], PageMetaDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "total pages", type: Number }),
    __metadata("design:type", Number)
], PageMetaDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "has next page", type: Boolean }),
    __metadata("design:type", Boolean)
], PageMetaDto.prototype, "next", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "has previous page", type: Boolean }),
    __metadata("design:type", Boolean)
], PageMetaDto.prototype, "previous", void 0);
//# sourceMappingURL=pageMeta.dto.js.map