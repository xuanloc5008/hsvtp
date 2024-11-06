import { University } from './university.entity';
import { UniversityCreate, UniversityUpdate } from './dtos';
import { DataSource, Repository } from 'typeorm';
import { PageDto } from '../common/dtos/page.dto';
import { PageOptionDto } from '../common/dtos/pageOption.dto';
export declare class UniversityService {
    private readonly universityRepo;
    private readonly dataSource;
    constructor(universityRepo: Repository<University>, dataSource: DataSource);
    createUniversity(data: UniversityCreate): Promise<University>;
    updateUniversity(id: string, data: UniversityUpdate): Promise<import("../common").SuccessResponse<any>>;
    deleteUniversity(id: string): Promise<import("../common").SuccessResponse<any>>;
    listUniversity(pageOption: PageOptionDto): Promise<PageDto<University>>;
}
