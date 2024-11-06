import { PageOptionDto } from "./pageOption.dto";
export declare class PageMetaDto {
    page: number;
    take: number;
    totalItems: number;
    totalPages: number;
    next: boolean;
    previous: boolean;
    constructor(totalItems: number, pageOption: PageOptionDto);
}
