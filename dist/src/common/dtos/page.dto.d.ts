import { PageMetaDto } from "./pageMeta.dto";
export declare class PageDto<T> {
    readonly data: T[];
    readonly meta: PageMetaDto;
    constructor(data: T[], meta: PageMetaDto);
}
