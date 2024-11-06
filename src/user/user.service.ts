import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPayload, IJwtToken, Role, User } from './user.entity';
import { And, DataSource, DeleteResult, QueryFailedError, Repository, UpdateResult } from 'typeorm';
import {
    UserChangePasswordDto,
    UserCreateDTO,
    UserLoginDTO,
    UserUpdateInformationDto,
} from './dtos';
import { JwtService } from '@nestjs/jwt';
import { ExceptionBadRequest, ExceptionEntityNotFound } from '../common';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/pageMeta.dto';
import * as bcrypt from 'bcrypt';
import { University } from 'src/university/university.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource,
    ) {}

    async createUser(data: UserCreateDTO) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user_findname = await queryRunner.manager.findOne(User, {
                where: {
                    username: data.username,
                },
            });
            const user_email = await queryRunner.manager.findOne(User, {
                where: {
                    email: data.email,
                },
            });
            if (data.username == '') {
                throw new ConflictException('username is null');
            } else if (data.password == '') {
                throw new ConflictException('password is null');
            }
            if (user_findname) {
                throw new ConflictException('username already exist');
            }
            if (user_email) {
                throw new ConflictException('email has already existed');
            }
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(data.password, salt); // Hash the password with the salt
            const newUser = queryRunner.manager.create(User, {
                ...data,
                password: hashedPassword,
                salt,
            });

            await queryRunner.manager.save(User, newUser); // Save the user to the database
            await queryRunner.commitTransaction();

            return {
                message: 'success',
            }; // Return success message
        } catch (err) {
            await queryRunner.rollbackTransaction();
            return {
                message: err.message,
            }; // Return success message
        } finally {
            await queryRunner.release();
        }
    }

    async CreateUniversityAccount(data: UserCreateDTO, university_id: string) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user_findname = await queryRunner.manager.findOne(User, {
                where: {
                    username: data.username,
                },
            });
            const user_email = await queryRunner.manager.findOne(User, {
                where: {
                    email: data.email,
                },
            });
            if (data.username == '') {
                throw new ConflictException('username is null');
            } else if (data.password == '') {
                throw new ConflictException('password is null');
            }
            if (user_findname) {
                throw new ConflictException('username already exist');
            }
            if (user_email) {
                throw new ConflictException('email has already existed');
            }
            const university = await queryRunner.manager.findOneBy(University, {id : university_id});
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(data.password, salt); // Hash the password with the salt
            const newUser = queryRunner.manager.create(User, {
                ...data,
                password: hashedPassword,
                salt,
                role: [Role.UniversityManager],
                university: university,
                university_id: university_id
            });

            await queryRunner.manager.save(User, newUser); // Save the user to the database
            await queryRunner.commitTransaction();

            return {
                message: 'success',
            }; // Return success message
        } catch (err) {
            await queryRunner.rollbackTransaction();
            return {
                message: err.message,
            }; // Return success message
        } finally {
            await queryRunner.release();
        }
    }

    async Login(data: UserLoginDTO): Promise<IJwtToken> {
        const user = await this.userRepo.findOne({
            where: { username: data.username },
        });

        if (!user) {
            throw new NotFoundException('username not exist');
        }

        const hashedPassword = await bcrypt.hash(data.password, user.salt);
        if (hashedPassword !== user.password) {
            throw new NotFoundException('password is not correct');
        }

        return this.generateJwtToken({
            id: user.id,
            username: user.username,
            role: user.role,
        });
    }

    async GetUserById(Id: string): Promise<User> {
        return this.userRepo.findOneBy({ id: Id });
    }

    generateJwtToken(payload: AuthPayload): IJwtToken {
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async GetAllUser(pageOption: PageOptionDto): Promise<PageDto<User>> {
        const queryBuilder = this.userRepo.createQueryBuilder('user');
        queryBuilder
            .orderBy('user.id', pageOption.orderBy)
            .skip(pageOption.skip)
            .take(pageOption.take);

        const totalItems = await queryBuilder.getCount();
        const listUser = (await queryBuilder.getRawAndEntities()).entities;
        const pageMeta = new PageMetaDto(totalItems, pageOption);
        return new PageDto<User>(listUser, pageMeta);
    }

    async ChangePassword(Id: string, data: UserChangePasswordDto) {
        const user = await this.userRepo.findOneBy({
            id: Id,
        });
        if (!user) {
            throw new NotFoundException('account is not exist');
        }
        const password = btoa(data.OldPassword + user.salt);
        if (password != user.password) {
            throw new ExceptionBadRequest('old password is not correct');
        }
        if (data.OldPassword === data.NewPassword) {
            throw new ExceptionBadRequest(
                'The new password must be different from old password ',
            );
        }
        user.password = btoa(data.NewPassword + user.salt);
        await this.userRepo.save(user);
    }

    async UpdateInformation(
        Id: string,
        data: UserUpdateInformationDto,
    ): Promise<UpdateResult> {
        const user = await this.userRepo.findOneBy({
            id: Id,
        });

        if (!user) {
            throw new ExceptionEntityNotFound('user not found');
        }
        const updateUser = new UserUpdateInformationDto();
        updateUser.email = data.email;
        updateUser.familyName = data.familyName;
        updateUser.givenName = data.givenName;
        return this.userRepo.update({ id: Id }, updateUser);
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return this.userRepo.delete({ id: id });
    }

    async updateRoleUser(myRoles : Role[] ,id: string, role: Role[]) {
        const user = await this.userRepo.findOneBy({id})
        if (!user) {
            throw new NotFoundException('user not found');
        }
        
        if(myRoles.includes(Role.Admin)){
            if(role.includes(Role.SuperAdmin))
                throw new ConflictException(`You do not have permission to assign ${Role.SuperAdmin}`);
            if(user.role.includes(Role.SuperAdmin))
                throw new ConflictException(`You do not have permission to change ${Role.SuperAdmin}`);
        }
        user.role = role;
        await this.userRepo.save(user);
        return { message : "update role success"};
    }
    async searchUsers(givenName?: string, familyName?: string, role?: string, university?: string) {
        let query = this.userRepo.createQueryBuilder('user').leftJoinAndSelect('user.university', 'university');
        query = query.andWhere('user.university IS NOT NULL');
        if(university) {
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
        // let query = this.userRepo.createQueryBuilder('user');
        // query = query.andWhere(':role = ANY(user.role)', { role });    
        // console.log(givenName);
        // query = query.where(":role = ANY(user.role)", { role: role });
        // query = query.andWhere('user.givenName LIKE :givenName', { givenName: `%${givenName}%` });
        return await query.getMany();
      }
}
