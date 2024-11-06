import { DataSource, Repository } from 'typeorm';
import { PostRequest } from './post-request.entity';
import { AuthPayload } from 'src/user/user.entity';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { updateRequestDto } from './dtos/updateRequestDto';
export declare class PostRequestService {
    private readonly requestRepo;
    private readonly dataSource;
    constructor(requestRepo: Repository<PostRequest>, dataSource: DataSource);
    createPostRequest(id: string, receiverIds: string[], user: AuthPayload): Promise<PostRequest[]>;
    UpdatePostRequest(id: string, data: updateRequestDto, user: AuthPayload): Promise<{
        request: PostRequest;
    }>;
    DeletePostRequest(id: string, user: AuthPayload): Promise<{
        request: PostRequest;
    }>;
    getAllPostRequestReceiver(pageOption: PageOptionDto, user: AuthPayload): Promise<PageDto<PostRequest>>;
    getAllPostRequest(pageOption: PageOptionDto, user: AuthPayload): Promise<PageDto<PostRequest>>;
}
