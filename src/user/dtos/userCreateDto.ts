import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, Length} from 'class-validator';

export class UserCreateDTO {
    @IsString()
    @Length(6, 30)
    @ApiProperty({
        example: 'klay12343431',
        description: 'enter your username',
        required: true,
    })
    username: string;

    @IsString()
    @Length(6, 30)
    @ApiProperty({
        example: 'nbafinal2016',
        description: 'enter your password',
        required: true,
    })
    password: string;

    @IsEmail()
    @Length(6, 30)
    @ApiProperty({
        example: 'abcdxyz@gmail.com',
        description: 'enter your email',
        required: true,
    })
    email: string;

    @IsString()
    @Length(1, 30)
    @ApiProperty({
        example: 'Thompson',
        description: 'enter your family name',
        required: true,
    })
    familyName: string;

    @IsString()
    @Length(1, 30)
    @ApiProperty({
        example: 'Klay',
        description: 'enter your given name',
        required: true,
    })
    givenName: string;
}
