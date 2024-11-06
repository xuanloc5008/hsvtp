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
exports.PostRequestService = void 0;
const typeorm_1 = require("typeorm");
const post_request_entity_1 = require("./post-request.entity");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const post_entity_1 = require("../post/post.entity");
const university_entity_1 = require("../university/university.entity");
const user_entity_1 = require("../user/user.entity");
const pageMeta_dto_1 = require("../common/dtos/pageMeta.dto");
const page_dto_1 = require("../common/dtos/page.dto");
let PostRequestService = class PostRequestService {
    constructor(requestRepo, dataSource) {
        this.requestRepo = requestRepo;
        this.dataSource = dataSource;
    }
    async createPostRequest(id, receiverIds, user) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let post = await this.dataSource.manager.findOneBy(post_entity_1.Post, { id });
            if (!post) {
                throw new common_1.NotFoundException('Post not found');
            }
            const crtUser = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
            if (id == crtUser.university_id) {
                throw new common_1.ConflictException('You can not create request post to your university');
            }
            if (post.university_id != crtUser.university_id) {
                throw new common_1.ConflictException('You are not allowed to create request for this post');
            }
            const post_requests = await Promise.all(receiverIds.map(async (id) => {
                let university = await this.dataSource.manager.findOneBy(university_entity_1.University, { id });
                if (!university) {
                    throw new common_1.NotFoundException(`University with id ${id} not found`);
                }
                let post_request = new post_request_entity_1.PostRequest();
                post_request.post_id = id;
                post_request.post = post;
                post_request.university = university;
                post_request.university_receiver_id = id;
                return post_request;
            }));
            await queryRunner.manager.save(post_requests);
            await queryRunner.commitTransaction();
            return post_requests;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async UpdatePostRequest(id, data, user) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let request = await this.dataSource.manager.findOneBy(post_request_entity_1.PostRequest, { id });
            if (!request) {
                throw new common_1.NotFoundException('Request not found');
            }
            const crtUser = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
            if (request.university_receiver_id != crtUser.university_id) {
                throw new common_1.ConflictException('You are not allowed to update this request');
            }
            request.feedback = data.feedback;
            request.linkPost = data.linkPost;
            request.status = data.status;
            await queryRunner.manager.save(request);
            await queryRunner.commitTransaction();
            return { request };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async DeletePostRequest(id, user) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let request = await this.dataSource.manager.findOne(post_request_entity_1.PostRequest, {
                where: { id },
                relations: ['post']
            });
            if (!request) {
                throw new common_1.NotFoundException('Request not found');
            }
            const crtUser = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
            if (request.post.university_id != crtUser.university_id) {
                throw new common_1.ConflictException('You are not allowed to delete this request');
            }
            await queryRunner.manager.remove(request);
            await queryRunner.commitTransaction();
            return { request };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getAllPostRequestReceiver(pageOption, user) {
        const crtUser = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
        if (!crtUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const queryBuilder = this.requestRepo.createQueryBuilder('postRequest');
        queryBuilder.leftJoinAndSelect('postRequest.university', 'university')
            .where('postRequest.university_receiver_id = :id', { id: crtUser.university_id })
            .skip(pageOption.skip)
            .take(pageOption.take);
        const requests = await queryBuilder.getCount();
        const listRequest = (await queryBuilder.getRawAndEntities()).entities;
        const pageMeta = new pageMeta_dto_1.PageMetaDto(requests, pageOption);
        return new page_dto_1.PageDto(listRequest, pageMeta);
    }
    async getAllPostRequest(pageOption, user) {
        const crtUser = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
        if (!crtUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const queryBuilder = this.requestRepo.createQueryBuilder('postRequest');
        queryBuilder.leftJoinAndSelect('postRequest.post', 'post')
            .leftJoinAndSelect('postRequest.university', 'university')
            .where('post.university_id = :id', { id: crtUser.university_id })
            .skip(pageOption.skip)
            .take(pageOption.take);
        const requests = await queryBuilder.getCount();
        const listRequest = (await queryBuilder.getRawAndEntities()).entities;
        const pageMeta = new pageMeta_dto_1.PageMetaDto(requests, pageOption);
        return new page_dto_1.PageDto(listRequest, pageMeta);
    }
};
exports.PostRequestService = PostRequestService;
exports.PostRequestService = PostRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(post_request_entity_1.PostRequest)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], PostRequestService);
//# sourceMappingURL=post-request.service.js.map