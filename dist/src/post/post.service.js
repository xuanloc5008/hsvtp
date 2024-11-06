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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./post.entity");
const typeorm_2 = require("typeorm");
const pageMeta_dto_1 = require("../common/dtos/pageMeta.dto");
const page_dto_1 = require("../common/dtos/page.dto");
const common_2 = require("../common");
const user_entity_1 = require("../user/user.entity");
let PostService = class PostService {
    constructor(postRepo, dataSource) {
        this.postRepo = postRepo;
        this.dataSource = dataSource;
    }
    async createPost(data, user) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const current_user = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
            const newPost = queryRunner.manager.create(post_entity_1.Post, {
                university_id: current_user.university_id,
                title: data.title,
                content: data.content,
            });
            await queryRunner.manager.save(post_entity_1.Post, newPost);
            await queryRunner.commitTransaction();
            return (0, common_2.NewSuccessResponse)('success');
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
    async updatePost(data, id, user) {
        const current_user = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
        const post = await this.postRepo.findOne({
            where: {
                id: id,
                university_id: current_user.university_id
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post does not exist');
        }
        post.content = data.content;
        post.title = data.title;
        return this.postRepo.save(post);
    }
    async deletePost(id, user) {
        const current_user = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
        const post = await this.postRepo.findOne({
            where: {
                id: id,
                university_id: current_user.university_id,
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post does not exist');
        }
        await this.postRepo.remove(post);
        return (0, common_2.NewSuccessResponse)('success');
    }
    async getPost(id, user) {
        const current_user = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
        const post = await this.postRepo.findOne({
            where: {
                id: id,
                university_id: current_user.university_id,
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post does not exist');
        }
        return post;
    }
    async listPost(pageOption, user) {
        const queryBuilder = this.postRepo.createQueryBuilder('post');
        const current_user = await this.dataSource.manager.findOneBy(user_entity_1.User, { id: user.id });
        if (!current_user) {
            throw new common_1.NotFoundException('User not found');
        }
        queryBuilder
            .where('post.university_id = :uni_id', { uni_id: current_user.university_id })
            .orderBy('post.id', pageOption.orderBy)
            .skip(pageOption.skip)
            .take(pageOption.take)
            .select([
            'post.id',
            'post.created_at',
            'post.updated_at',
            'post.university_id',
            'post.title',
            'post.content',
        ]);
        const totalItems = await queryBuilder.getCount();
        const listPost = (await queryBuilder.getRawAndEntities()).entities;
        const pageMeta = new pageMeta_dto_1.PageMetaDto(totalItems, pageOption);
        return new page_dto_1.PageDto(listPost, pageMeta);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], PostService);
//# sourceMappingURL=post.service.js.map