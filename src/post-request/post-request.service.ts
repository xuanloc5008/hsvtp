
import { DataSource, Repository } from 'typeorm';
import { PostRequest } from './post-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/post/post.entity';
import { University } from 'src/university/university.entity';
import { AuthPayload, User } from 'src/user/user.entity';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { PageMetaDto } from 'src/common/dtos/pageMeta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { updateRequestDto } from './dtos/updateRequestDto';

@Injectable()
export class PostRequestService {
    constructor(
        @InjectRepository(PostRequest)
        private readonly requestRepo : Repository<PostRequest>,
        
        private readonly dataSource : DataSource,
    ) {}


    async createPostRequest(id : string, receiverIds : string[], user : AuthPayload) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let post = await this.dataSource.manager.findOneBy(Post, {id});
            if (!post) {
                throw new NotFoundException('Post not found');
            }
            const crtUser = await this.dataSource.manager.findOneBy(User, {id : user.id});
            if (id == crtUser.university_id) {
                throw new ConflictException('You can not create request post to your university');
            }
            if(post.university_id != crtUser.university_id) {
                throw new ConflictException('You are not allowed to create request for this post');
            }
            const post_requests = await Promise.all(receiverIds.map( async (id) =>{
                let university = await this.dataSource.manager.findOneBy(University ,{id})
                if (!university) {
                    throw new NotFoundException(`University with id ${id} not found`);
                }
                
                let post_request = new PostRequest();
                post_request.post_id = id;
                post_request.post = post;
                
                post_request.university = university;
                post_request.university_receiver_id = id;
                return post_request;
                
            }));
            await queryRunner.manager.save(post_requests);  
            await queryRunner.commitTransaction();
            return post_requests
        } catch (error) {
         
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async UpdatePostRequest(id : string, data : updateRequestDto, user : AuthPayload) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let request = await this.dataSource.manager.findOneBy(PostRequest, {id});
            if (!request) {
                throw new NotFoundException('Request not found');
            }
            const crtUser = await this.dataSource.manager.findOneBy(User, {id : user.id});
            if(request.university_receiver_id != crtUser.university_id) {
                throw new ConflictException('You are not allowed to update this request');
            }
            request.feedback = data.feedback;
            request.linkPost = data.linkPost;
            request.status = data.status;
        
            await queryRunner.manager.save(request);
            await queryRunner.commitTransaction();
            return {request};
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release()
        }
    }

    async DeletePostRequest(id : string, user : AuthPayload) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let request = await this.dataSource.manager.findOne(PostRequest, {
                where : {id},
                relations : ['post']
            });
            if (!request) {
                throw new NotFoundException('Request not found');
            }
            const crtUser = await this.dataSource.manager.findOneBy(User, {id : user.id});
            if(request.post.university_id != crtUser.university_id) {
                throw new ConflictException('You are not allowed to delete this request');
            }
            await queryRunner.manager.remove(request);
            await queryRunner.commitTransaction();
            return {request};
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
    async getAllPostRequestReceiver(pageOption : PageOptionDto ,user : AuthPayload) {
        const crtUser = await this.dataSource.manager.findOneBy(User, {id : user.id});
        if (!crtUser) {
            throw new NotFoundException('User not found');
        }
        const queryBuilder = this.requestRepo.createQueryBuilder('postRequest')
        queryBuilder.leftJoinAndSelect('postRequest.university', 'university')
                    .where('postRequest.university_receiver_id = :id', {id : crtUser.university_id})
                    .skip(pageOption.skip)
                    .take(pageOption.take)
        
        const requests = await queryBuilder.getCount();
        const listRequest = (await queryBuilder.getRawAndEntities()).entities;
        const pageMeta = new PageMetaDto(requests, pageOption);
        return new PageDto<PostRequest>(listRequest, pageMeta);
    }

    async getAllPostRequest(pageOption : PageOptionDto ,user : AuthPayload) {
        const crtUser = await this.dataSource.manager.findOneBy(User, {id : user.id});
        if (!crtUser) {
            throw new NotFoundException('User not found');
        }
        const queryBuilder = this.requestRepo.createQueryBuilder('postRequest')
        queryBuilder.leftJoinAndSelect('postRequest.post', 'post')
                    .leftJoinAndSelect('postRequest.university', 'university')
                    .where('post.university_id = :id', {id : crtUser.university_id})
                    .skip(pageOption.skip)
                    .take(pageOption.take)
        
        const requests = await queryBuilder.getCount();
        const listRequest = (await queryBuilder.getRawAndEntities()).entities;
        const pageMeta = new PageMetaDto(requests, pageOption);
        return new PageDto<PostRequest>(listRequest, pageMeta);
    }
}
