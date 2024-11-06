import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewSuccessResponse } from 'src/common';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { AuthGuard } from 'src/user/guards/jwt.guards';
import { RolesGuard } from 'src/user/guards/role.guards';
import { CurrentUser, Roles } from 'src/common/decorator';
import { AuthPayload, Role } from 'src/user/user.entity';
import { postcreateDTO } from './dtos/postCreate';

@Controller('post')
@ApiTags('Post')

export class PostController {
    constructor(private readonly postservice: PostService){}

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create post - only role university manager can create post' })   
    @ApiResponse({
        status: 201,
        description: 'The post has been successfully created.',
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager)
    @Post()
    async createPost(
        @Body() data: postcreateDTO,
        @CurrentUser() user: AuthPayload
    ) {
        return this.postservice.createPost(data,user);        
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update post - only role university manager can update post' })
    @ApiResponse({
        status: 201,
        description: 'The post has been successfully updated.',
        type: NewSuccessResponse
    })
    @ApiParam({
    name: 'id',
    description: 'The ID of the post to update',
    type: String,
    })
    @ApiOperation({ summary: 'Update post by ID - only role university manager can update post' })
    @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    })
    @ApiResponse({
    status: 404,
    description: 'Post not found.',
    })
    @ApiParam({
    name: 'id',
    description: 'The ID of the post to update',
    type: String,
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager)
    @Put(':id')
    async updatePost(
        @Body() data: postcreateDTO,
        @Param('id') id: string,
        @CurrentUser() user: AuthPayload
    ) {
    return this.postservice.updatePost(data, id, user);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Delete post by ID - only role university manager can delete post' })
    @ApiResponse({
    status: 201,
    description: 'The post has been successfully deleted.',
    })
    @ApiResponse({
    status: 404,
    description: 'Post not found.',
    })
    @ApiParam({
    name: 'id',
    description: 'The ID of the post to delete',
    type: String,
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager)
    @Delete(':id')
    async deletePost(
    @Param('id') id: string,
    @CurrentUser() user: AuthPayload
    ) {
    return this.postservice.deletePost(id, user);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get post by ID - only role university manager can get post' })
    @ApiResponse({
    status: 200,
    description: 'The post has been successfully retrieved.',
    })
    @ApiResponse({
    status: 404,
    description: 'Post not found.',
    })
    @ApiParam({
    name: 'id',
    description: 'The ID of the post to retrieve',
    type: String,
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager)
    @Get(':id')
    async getPost(
    @Param('id') id: string,
    @CurrentUser() user: AuthPayload
    ) {
    return this.postservice.getPost(id, user);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'List post - only role university manager can get the list of post' })
    @ApiResponse({ status: 200, description: 'Return list of post' })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager)    
    @Get()
    async listPost(@Query() pageOption: PageOptionDto, @CurrentUser() user:  AuthPayload){
        return this.postservice.listPost(pageOption, user);
    }
}
