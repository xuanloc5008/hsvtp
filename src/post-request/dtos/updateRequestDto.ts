import { ApiProperty } from "@nestjs/swagger";
import { PostRequestStatus } from "../post-request.entity";
import { IsString, IsUrl } from "class-validator";

export class updateRequestDto {
    @IsString()
    @ApiProperty({
        description: 'Feedback',
        example: 'This is a feedback',
    })
    feedback: string;

    @IsUrl()
    @IsString()
    @ApiProperty({
        description: 'Link Post',
        example: 'https://www.facebook.com',
    })
    linkPost: string;

    @ApiProperty({description : 'Status'})
    status: PostRequestStatus;
}