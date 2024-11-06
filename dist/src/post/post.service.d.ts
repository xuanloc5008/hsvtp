import { Post } from './post.entity';
import { DataSource, Repository } from 'typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { AuthPayload } from 'src/user/user.entity';
import { postcreateDTO } from './dtos/postCreate';
import { PageOptionDto } from 'src/common/dtos/pageOption.dto';
export declare class PostService {
    private readonly postRepo;
    private readonly dataSource;
    constructor(postRepo: Repository<Post>, dataSource: DataSource);
    createPost(data: postcreateDTO, user: AuthPayload): Promise<import("src/common").SuccessResponse<any> | {
        message: any;
    }>;
    updatePost(data: postcreateDTO, id: string, user: AuthPayload): Promise<Post>;
    deletePost(id: string, user: AuthPayload): Promise<import("src/common").SuccessResponse<any>>;
    getPost(id: string, user: AuthPayload): Promise<Post>;
    listPost(pageOption: PageOptionDto, user: AuthPayload): Promise<PageDto<Post>>;
}
