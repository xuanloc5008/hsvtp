import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class postcreateDTO {
    @IsNotEmpty()
    @Length(1,100)
    @ApiProperty({
        description: 'title',
        example: "Sample Post Title or Updated Post Title",
        required: true
    })
    title: string;

    @IsNotEmpty()
    @Length(1,100)
    @ApiProperty({
        description: 'content',
        example: "This is the content of the sample post or updated post",
        required: true
    })
    content: string;
}
