import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    isEmail,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';

export class UserUpdateInformationDto {
    // @ApiProperty({
    //     description: 'update name',
    //     type: String,
    //     required: false,
    // })
    // @IsString()
    // username?: string;

    @ApiProperty({
        description: 'email',
        type: String,
        required: false,
        example: 'example@gmail.com',
    })
    @Length(5, 30)
    @IsEmail()
    email?: string;
    // nếu cho phép user update email thì cần xác thực email này

    @ApiProperty({
        description: 'family Name',
        required: false,
        type: String,
        example: 'familyname user',
    })
    @Length(2, 30)
    @IsOptional()
    @IsString()
    familyName?: string;

    @ApiProperty({
        description: 'given Name',
        required: false,
        type: String,
        example: 'name user',
    })
    @Length(2, 30)
    @IsOptional()
    @IsString()
    givenName?: string;
}
