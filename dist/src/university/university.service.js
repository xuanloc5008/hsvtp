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
exports.UniversityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const university_entity_1 = require("./university.entity");
const typeorm_2 = require("typeorm");
const common_2 = require("../common");
const pageMeta_dto_1 = require("../common/dtos/pageMeta.dto");
const page_dto_1 = require("../common/dtos/page.dto");
let UniversityService = class UniversityService {
    constructor(universityRepo, dataSource) {
        this.universityRepo = universityRepo;
        this.dataSource = dataSource;
    }
    async createUniversity(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let entity = await this.dataSource.manager.findOneBy(university_entity_1.University, {
                name: data.name,
            });
            if (entity) {
                throw new common_2.ExceptionBadRequest('This university name already existed');
            }
            entity = await this.dataSource.manager.findOneBy(university_entity_1.University, {
                shortName: data.shortName,
            });
            if (entity) {
                throw new common_2.ExceptionBadRequest('This university short name already existed');
            }
            const res = await this.dataSource.manager.save(university_entity_1.University, {
                ...data,
            });
            await queryRunner.commitTransaction();
            return res;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateUniversity(id, data) {
        const university = await this.universityRepo.findOneBy({
            id,
        });
        if (!university) {
            throw new common_1.NotFoundException('University does not exist');
        }
        if (data.name != undefined &&
            (await this.universityRepo.findOneBy({ name: data.name }))) {
            throw new common_2.ExceptionBadRequest('university name exists');
        }
        if (data.shortName != undefined &&
            (await this.universityRepo.findOneBy({ shortName: data.shortName }))) {
            throw new common_2.ExceptionBadRequest('university shortname exists');
        }
        if (data.name != undefined) {
            university.name = data.name;
        }
        if (data.avatar != undefined) {
            university.avatar = data.avatar;
        }
        if (data.description != undefined) {
            university.description = data.description;
        }
        if (data.shortName != undefined) {
            university.shortName = data.shortName;
        }
        await this.universityRepo.save(university);
        return (0, common_2.NewSuccessResponse)('success');
    }
    async deleteUniversity(id) {
        await this.universityRepo.delete(id);
        return (0, common_2.NewSuccessResponse)('success');
    }
    async listUniversity(pageOption) {
        const queryBuilder = this.universityRepo.createQueryBuilder('university');
        queryBuilder
            .orderBy('university.id', pageOption.orderBy)
            .skip(pageOption.skip)
            .take(pageOption.take)
            .select([
            'university.id',
            'university.name',
            'university.shortName',
            'university.description',
            'university.avatar',
        ]);
        const totalItems = await queryBuilder.getCount();
        const listUniversity = (await queryBuilder.getRawAndEntities())
            .entities;
        const pageMeta = new pageMeta_dto_1.PageMetaDto(totalItems, pageOption);
        return new page_dto_1.PageDto(listUniversity, pageMeta);
    }
};
exports.UniversityService = UniversityService;
exports.UniversityService = UniversityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(university_entity_1.University)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UniversityService);
//# sourceMappingURL=university.service.js.map