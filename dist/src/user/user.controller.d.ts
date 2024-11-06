import { UserService } from './user.service';
import { UserChangePasswordDto, UserCreateDTO, UserLoginDTO, UserUpdateInformationDto } from './dtos';
import { AuthPayload, Role } from './user.entity';
import { DeleteResult } from 'typeorm';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(data: UserCreateDTO): Promise<{
        message: any;
    }>;
    Login(data: UserLoginDTO): Promise<import("./user.entity").IJwtToken>;
    GetMe(user: AuthPayload): Promise<import("./user.entity").User>;
    GetAllUser(pageOption: PageOptionDto): Promise<import("../common/dtos/page.dto").PageDto<import("./user.entity").User>>;
    ChangePassword(user: AuthPayload, data: UserChangePasswordDto): Promise<void>;
    UpdateInformation(user: AuthPayload, data: UserUpdateInformationDto): Promise<import("typeorm").UpdateResult>;
    Delete(id: string): Promise<DeleteResult>;
    UpdateRoleUser(userId: string, role: Role[], user: AuthPayload): Promise<{
        message: string;
    }>;
    CreateUniversityAccount(data: UserCreateDTO, universityId: string): Promise<{
        message: any;
    }>;
    searchUser(familyName?: string, lastName?: string, university?: string, role?: string): Promise<import("./user.entity").User[]>;
}
