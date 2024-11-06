import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { DataSource, Not, Repository } from 'typeorm';
import { PageMetaDto } from 'src/common/dtos/pageMeta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { ExceptionBadRequest, NewSuccessResponse } from 'src/common';
import { AuthPayload, User } from 'src/user/user.entity';
import { postcreateDTO } from './dtos/postCreate';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    private readonly dataSource: DataSource,
  ) {}

  async createPost(data: postcreateDTO, user : AuthPayload) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if a post already exists for the given university_id
      const current_user = await this.dataSource.manager.findOneBy(User, {id: user.id})
      // Create the new post
      const newPost = queryRunner.manager.create(Post, {
        university_id: current_user.university_id,  // Ensure university_id is provided
        title: data.title,
        content: data.content,
      });

      // Save the new post
      await queryRunner.manager.save(Post, newPost);
      await queryRunner.commitTransaction();

      return NewSuccessResponse('success')
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return {
        message: err.message,
      };
    } finally {
      await queryRunner.release();
    }
  }

  
  async updatePost(data: postcreateDTO, id: string, user: AuthPayload): Promise<Post> {
    const current_user = await this.dataSource.manager.findOneBy(User, {id: user.id});
    const post = await this.postRepo.findOne({
      where: {
        id: id,
        university_id: current_user.university_id
      },
    });
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }

    post.content = data.content;
    post.title = data.title;

    return this.postRepo.save(post);
  }

  async deletePost(id: string, user: AuthPayload) {
    const current_user = await this.dataSource.manager.findOneBy(User, {id: user.id});
    const post = await this.postRepo.findOne({
      where: {
        id: id,
        university_id: current_user.university_id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post does not exist');
    }

    await this.postRepo.remove(post);

    return NewSuccessResponse('success');
  }
  async getPost(id: string, user: AuthPayload): Promise<Post> {
    const current_user = await this.dataSource.manager.findOneBy(User, {id: user.id});
    const post = await this.postRepo.findOne({
      where: {
        id: id,
        university_id: current_user.university_id,
      },
    });
  
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }
  
    return post;
  }
  
  async listPost(pageOption: PageOptionDto, user: AuthPayload) {
    const queryBuilder = this.postRepo.createQueryBuilder('post');
    const current_user = await this.dataSource.manager.findOneBy(User, {id: user.id});
    if(!current_user){
      throw new NotFoundException('User not found');
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
    const pageMeta = new PageMetaDto(totalItems, pageOption);
  
    return new PageDto<Post>(listPost, pageMeta);
  }  
}