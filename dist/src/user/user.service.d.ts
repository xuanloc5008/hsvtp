import { AuthPayload, IJwtToken, Role, User } from './user.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserChangePasswordDto, UserCreateDTO, UserLoginDTO, UserUpdateInformationDto } from './dtos';
import { JwtService } from '@nestjs/jwt';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { PageDto } from 'src/common/dtos/page.dto';
export declare class UserService {
    private userRepo;
    private readonly jwtService;
    private readonly dataSource;
    constructor(userRepo: Repository<User>, jwtService: JwtService, dataSource: DataSource);
    createUser(data: UserCreateDTO): Promise<{
        message: any;
    }>;
    CreateUniversityAccount(data: UserCreateDTO, university_id: string): Promise<{
        message: any;
    }>;
    Login(data: UserLoginDTO): Promise<IJwtToken>;
    GetUserById(Id: string): Promise<User>;
    generateJwtToken(payload: AuthPayload): IJwtToken;
    GetAllUser(pageOption: PageOptionDto): Promise<PageDto<User>>;
    ChangePassword(Id: string, data: UserChangePasswordDto): Promise<void>;
    UpdateInformation(Id: string, data: UserUpdateInformationDto): Promise<UpdateResult>;
    deleteUser(id: string): Promise<DeleteResult>;
    updateRoleUser(myRoles: Role[], id: string, role: Role[]): Promise<{
        message: string;
    }>;
    searchUsers(givenName?: string, familyName?: string, role?: string, university?: string): Promise<User[]>;
}
