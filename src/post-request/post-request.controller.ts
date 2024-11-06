import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards } from '@nestjs/common';
import { PostRequestService } from './post-request.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/guards/jwt.guards';
import { RolesGuard } from 'src/user/guards/role.guards';
import { CurrentUser, Roles } from 'src/common/decorator';
import { AuthPayload, Role } from 'src/user/user.entity';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { TypeORMExceptionFilter } from 'src/common/typeorm-exception.filter';
import { updateRequestDto } from './dtos/updateRequestDto';

@Controller('post-request')
@ApiTags('Post Request')
@UseFilters(TypeORMExceptionFilter)
export class PostRequestController {
    constructor(private readonly postRequestService: PostRequestService) {}

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager) // only university manager can create post request
    @ApiOperation({ summary: 'Create post request - only role university manager can create post request' })
    @Post(':id')
    async createPostRequest(@Param('id') id: string, 
                            @CurrentUser() user : AuthPayload,
                            @Body() listReceiverId : string[]
                        ) {
        return this.postRequestService.createPostRequest(id, listReceiverId, user)
    }
    
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager)
    @ApiOperation({ summary: 'Update post-request - only university manager received post-request can update post request'})
    @Put(':id')
    async updatePostRequest(@Param('id') id: string,
                            @Body() data : updateRequestDto, 
                            @CurrentUser() user : AuthPayload, 
                            ) {
        return this.postRequestService.UpdatePostRequest(id, data, user)
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager)
    @ApiOperation({ summary: 'Delete post-request - Only university manage this post_request can delete' })
    @Delete(':id')
    async deletePostRequest(@Param('id') id: string, @CurrentUser() user : AuthPayload) {
        return this.postRequestService.DeletePostRequest(id, user)
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.UniversityManager)
    @ApiOperation({ summary: 'Get all post-request for receiver - Role: UniversityManager' })
    @Get('receiver')
    async getAllPostRequestForReceiver(@Query() pageOption : PageOptionDto, @CurrentUser() user : AuthPayload) {
        return this.postRequestService.getAllPostRequestReceiver(pageOption, user)
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.UniversityManager)
    @ApiOperation({ summary: 'Get all post-request for sender - Role: UniversityManager' })
    @Get('/')
    async getAllPostRequest(@Query() pageOption : PageOptionDto, @CurrentUser() user : AuthPayload) {
        return this.postRequestService.getAllPostRequest(pageOption, user)
    }
}
