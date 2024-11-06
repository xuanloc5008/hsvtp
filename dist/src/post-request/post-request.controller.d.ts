import { PostRequestService } from './post-request.service';
import { AuthPayload } from 'src/user/user.entity';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { updateRequestDto } from './dtos/updateRequestDto';
export declare class PostRequestController {
    private readonly postRequestService;
    constructor(postRequestService: PostRequestService);
    createPostRequest(id: string, user: AuthPayload, listReceiverId: string[]): Promise<import("./post-request.entity").PostRequest[]>;
    updatePostRequest(id: string, data: updateRequestDto, user: AuthPayload): Promise<{
        request: import("./post-request.entity").PostRequest;
    }>;
    deletePostRequest(id: string, user: AuthPayload): Promise<{
        request: import("./post-request.entity").PostRequest;
    }>;
    getAllPostRequestForReceiver(pageOption: PageOptionDto, user: AuthPayload): Promise<import("../common/dtos/page.dto").PageDto<import("./post-request.entity").PostRequest>>;
    getAllPostRequest(pageOption: PageOptionDto, user: AuthPayload): Promise<import("../common/dtos/page.dto").PageDto<import("./post-request.entity").PostRequest>>;
}
