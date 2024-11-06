import { UniversityService } from './university.service';
import { UniversityCreate, UniversityUpdate } from './dtos';
import { PageOptionDto } from '../common/dtos/pageOption.dto';
import { University } from './university.entity';
export declare class UniversityController {
    private readonly universityService;
    constructor(universityService: UniversityService);
    createUniversity(data: UniversityCreate): Promise<University>;
    updateUniversity(id: string, data: UniversityUpdate): Promise<import("../common").SuccessResponse<any>>;
    deleteUniversity(id: string): Promise<import("../common").SuccessResponse<any>>;
    listUniversity(pageOption: PageOptionDto): Promise<import("../common/dtos/page.dto").PageDto<University>>;
}
