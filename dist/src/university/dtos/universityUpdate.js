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
exports.UniversityUpdate = void 0;
const class_validator_1 = require("class-validator");
class UniversityUpdate {
}
exports.UniversityUpdate = UniversityUpdate;
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.name !== null && o.name !== undefined),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], UniversityUpdate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.shortName !== null && o.shortName !== undefined),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], UniversityUpdate.prototype, "shortName", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.description !== null && o.description !== undefined),
    (0, class_validator_1.Length)(0, 5000),
    __metadata("design:type", String)
], UniversityUpdate.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.avatar !== null && o.avatar !== undefined),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UniversityUpdate.prototype, "avatar", void 0);
//# sourceMappingURL=universityUpdate.js.map