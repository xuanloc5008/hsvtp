import {IsNotEmpty, IsUrl, Length, ValidateIf} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UniversityCreate {
    @IsNotEmpty()
    @Length(1, 100)
    @ApiProperty({description: 'university name'})
    name: string

    @Length(1, 20)
    @IsNotEmpty()
    @ApiProperty({description: 'university shortname', example: "HCMUT"})
    shortName: string

    @ValidateIf(o => o.avatar !== null && o.avatar !== undefined)
    @ApiProperty({description: "Url Of University Avatar"})
    @IsUrl()
    avatar?: string

    @IsNotEmpty()
    @ApiProperty({description: 'University Description'})
    @Length(1, 5000)
    description: string
}