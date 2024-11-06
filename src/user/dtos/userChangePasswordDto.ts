import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserChangePasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    OldPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    NewPassword: string;
}
