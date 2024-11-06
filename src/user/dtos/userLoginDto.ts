import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDTO {
    @ApiProperty({ description: 'username', required: true, type: String })
    @IsString()
    @Length(6, 30)
    // @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'password', required: true, type: String })
    @IsString()
    @Length(6, 30)
    // @IsNotEmpty()
    password: string;
}
