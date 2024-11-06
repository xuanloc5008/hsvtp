import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
    UserChangePasswordDto,
    UserCreateDTO,
    UserLoginDTO,
    UserUpdateInformationDto,
} from './dtos';
import { AuthGuard } from './guards/jwt.guards';
import { AuthPayload, Role } from './user.entity';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { CurrentUser, Roles } from '../common/decorator';
import { RolesGuard } from './guards/role.guards';
import { query } from 'express';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    // remove comment to enable role guard
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles(Role.Admin)
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
    })
    async createUser(@Body() data: UserCreateDTO) {
        return this.userService.createUser(data);
    }

    @Post('/login')
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, description: 'Login successfully' })
    async Login(@Body() data: UserLoginDTO) {
        return this.userService.Login(data);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @Get('/profile')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: 'Get profile' })
    @ApiResponse({ status: 200, description: 'Return profile of yourself' })
    async GetMe(@CurrentUser() user: AuthPayload) {
        return this.userService.GetUserById(user.id);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, RolesGuard)
    @Get('/')
    @ApiOperation({ summary: 'Get all user' })
    @ApiResponse({ status: 200, description: 'Return all user' })
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    @Roles(Role.Admin, Role.SuperAdmin)
    async GetAllUser(@Query() pageOption: PageOptionDto) {
        return this.userService.GetAllUser(pageOption);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Change password' })
    @Put('/change-password')
    async ChangePassword(
        @CurrentUser() user: AuthPayload,
        @Body() data: UserChangePasswordDto,
    ) {
        return this.userService.ChangePassword(user.id, data);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update infor user' })
    @Put('/')
    async UpdateInformation(
        @CurrentUser() user: AuthPayload,
        @Body() data: UserUpdateInformationDto,
    ) {
        return this.userService.UpdateInformation(user.id, data);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Delete user' })
    @ApiParam({ name: 'id', type: String, example: 'uuid' })
    @Roles(Role.Admin, Role.SuperAdmin)
    @Delete(':id')
    async Delete(@Param('id') id: string): Promise<DeleteResult> {
        return this.userService.deleteUser(id);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, RolesGuard)
    // @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'update role' })
    @ApiBody({
        isArray: true,
        description: `["${Role.SuperAdmin}", "${Role.Admin}",
                            "${Role.UniversityManager}" , "${Role.User}"]`,
    })
    @Put(':id/role')
    async UpdateRoleUser(
        @Param('id') userId: string,
        @Body() role: Role[],
        @CurrentUser() user: AuthPayload,
    ) {
        return this.userService.updateRoleUser(user.role, userId, role);
    }

    // @ApiBearerAuth('JWT-auth')
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'create accout University' })
    @Post('/account-university/:id')
    async CreateUniversityAccount(@Body() data: UserCreateDTO, 
        @Param('id') universityId: string) {
        return this.userService.CreateUniversityAccount(data, universityId);
    }

    @ApiOperation({ summary: 'Search users by family name, last name, university, role' })
    @Get('/search')
    async searchUser(
        @Query('familyName') familyName?: string,
        @Query('lastName') lastName?: string,
        @Query('university') university?: string,
        @Query('role') role?: string
    ) {
        console.log(university);
        return this.userService.searchUsers(familyName, lastName, role, university);
    }
}
