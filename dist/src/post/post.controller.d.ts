import { PostService } from './post.service';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
import { AuthPayload } from 'src/user/user.entity';
import { postcreateDTO } from './dtos/postCreate';
export declare class PostController {
    private readonly postservice;
    constructor(postservice: PostService);
    createPost(data: postcreateDTO, user: AuthPayload): Promise<import("src/common").SuccessResponse<any> | {
        message: any;
    }>;
    updatePost(data: postcreateDTO, id: string, user: AuthPayload): Promise<import("./post.entity").Post>;
    deletePost(id: string, user: AuthPayload): Promise<import("src/common").SuccessResponse<any>>;
    getPost(id: string, user: AuthPayload): Promise<import("./post.entity").Post>;
    listPost(pageOption: PageOptionDto, user: AuthPayload): Promise<import("../common/dtos/page.dto").PageDto<import("./post.entity").Post>>;
}
