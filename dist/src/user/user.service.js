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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const dtos_1 = require("./dtos");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("../common");
const page_dto_1 = require("../common/dtos/page.dto");
const pageMeta_dto_1 = require("../common/dtos/pageMeta.dto");
const bcrypt = require("bcrypt");
const university_entity_1 = require("../university/university.entity");
let UserService = class UserService {
    constructor(userRepo, jwtService, dataSource) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.dataSource = dataSource;
    }
    async createUser(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user_findname = await queryRunner.manager.findOne(user_entity_1.User, {
                where: {
                    username: data.username,
                },
            });
            const user_email = await queryRunner.manager.findOne(user_entity_1.User, {
                where: {
                    email: data.email,
                },
            });
            if (data.username == '') {
                throw new common_1.ConflictException('username is null');
            }
            else if (data.password == '') {
                throw new common_1.ConflictException('password is null');
            }
            if (user_findname) {
                throw new common_1.ConflictException('username already exist');
            }
            if (user_email) {
                throw new common_1.ConflictException('email has already existed');
            }
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            const newUser = queryRunner.manager.create(user_entity_1.User, {
                ...data,
                password: hashedPassword,
                salt,
            });
            await queryRunner.manager.save(user_entity_1.User, newUser);
            await queryRunner.commitTransaction();
            return {
                message: 'success',
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return {
                message: err.message,
            };
        }
        finally {
            await queryRunner.release();
        }
    }
    async CreateUniversityAccount(data, university_id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user_findname = await queryRunner.manager.findOne(user_entity_1.User, {
                where: {
                    username: data.username,
                },
            });
            const user_email = await queryRunner.manager.findOne(user_entity_1.User, {
                where: {
                    email: data.email,
                },
            });
            if (data.username == '') {
                throw new common_1.ConflictException('username is null');
            }
            else if (data.password == '') {
                throw new common_1.ConflictException('password is null');
            }
            if (user_findname) {
                throw new common_1.ConflictException('username already exist');
            }
            if (user_email) {
                throw new common_1.ConflictException('email has already existed');
            }
            const university = await queryRunner.manager.findOneBy(university_entity_1.University, { id: university_id });
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            const newUser = queryRunner.manager.create(user_entity_1.User, {
                ...data,
                password: hashedPassword,
                salt,
                role: [user_entity_1.Role.UniversityManager],
                university: university,
                university_id: university_id
            });
            await queryRunner.manager.save(user_entity_1.User, newUser);
            await queryRunner.commitTransaction();
            return {
                message: 'success',
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return {
                message: err.message,
            };
        }
        finally {
            await queryRunner.release();
        }
    }
    async Login(data) {
        const user = await this.userRepo.findOne({
            where: { username: data.username },
        });
        if (!user) {
            throw new common_1.NotFoundException('username not exist');
        }
        const hashedPassword = await bcrypt.hash(data.password, user.salt);
        if (hashedPassword !== user.password) {
            throw new common_1.NotFoundException('password is not correct');
        }
        return this.generateJwtToken({
            id: user.id,
            username: user.username,
            role: user.role,
        });
    }
    async GetUserById(Id) {
        return this.userRepo.findOneBy({ id: Id });
    }
    generateJwtToken(payload) {
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async GetAllUser(pageOption) {
        const queryBuilder = this.userRepo.createQueryBuilder('user');
        queryBuilder
            .orderBy('user.id', pageOption.orderBy)
            .skip(pageOption.skip)
            .take(pageOption.take);
        const totalItems = await queryBuilder.getCount();
        const listUser = (await queryBuilder.getRawAndEntities()).entities;
        const pageMeta = new pageMeta_dto_1.PageMetaDto(totalItems, pageOption);
        return new page_dto_1.PageDto(listUser, pageMeta);
    }
    async ChangePassword(Id, data) {
        const user = await this.userRepo.findOneBy({
            id: Id,
        });
        if (!user) {
            throw new common_1.NotFoundException('account is not exist');
        }
        const password = btoa(data.OldPassword + user.salt);
        if (password != user.password) {
            throw new common_2.ExceptionBadRequest('old password is not correct');
        }
        if (data.OldPassword === data.NewPassword) {
            throw new common_2.ExceptionBadRequest('The new password must be different from old password ');
        }
        user.password = btoa(data.NewPassword + user.salt);
        await this.userRepo.save(user);
    }
    async UpdateInformation(Id, data) {
        const user = await this.userRepo.findOneBy({
            id: Id,
        });
        if (!user) {
            throw new common_2.ExceptionEntityNotFound('user not found');
        }
        const updateUser = new dtos_1.UserUpdateInformationDto();
        updateUser.email = data.email;
        updateUser.familyName = data.familyName;
        updateUser.givenName = data.givenName;
        return this.userRepo.update({ id: Id }, updateUser);
    }
    async deleteUser(id) {
        return this.userRepo.delete({ id: id });
    }
    async updateRoleUser(myRoles, id, role) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        if (myRoles.includes(user_entity_1.Role.Admin)) {
            if (role.includes(user_entity_1.Role.SuperAdmin))
                throw new common_1.ConflictException(`You do not have permission to assign ${user_entity_1.Role.SuperAdmin}`);
            if (user.role.includes(user_entity_1.Role.SuperAdmin))
                throw new common_1.ConflictException(`You do not have permission to change ${user_entity_1.Role.SuperAdmin}`);
        }
        user.role = role;
        await this.userRepo.save(user);
        return { message: "update role success" };
    }
    async searchUsers(givenName, familyName, role, university) {
        let query = this.userRepo.createQueryBuilder('user').leftJoinAndSelect('user.university', 'university');
        query = query.andWhere('user.university IS NOT NULL');
        if (university) {
            query = query.andWhere('university.name LIKE :university', { university: `%${university}%` });
        }
        if (givenName) {
            query = query.andWhere('user.givenName LIKE :givenName', { givenName: `%${givenName}%` });
        }
        if (familyName) {
            query = query.andWhere('user.familyName LIKE :familyName', { familyName: `%${familyName}%` });
        }
        if (role) {
            query = query.andWhere(':role = ANY(user.role)', { role });
        }
        return await query.getMany();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.DataSource])
], UserService);
//# sourceMappingURL=user.service.js.map