import {IsUrl, Length, ValidateIf} from "class-validator";

export class UniversityUpdate {
    @ValidateIf(o => o.name !== null && o.name !== undefined)
    @Length(1, 100)
    name?: string;

    @ValidateIf(o => o.shortName !== null && o.shortName !== undefined)
    @Length(1, 100)
    shortName?: string;

    @ValidateIf(o => o.description !== null && o.description !== undefined)
    @Length(0, 5000)
    description?: string;

    @ValidateIf(o => o.avatar !== null && o.avatar !== undefined)
    @IsUrl()
    avatar?: string;
}