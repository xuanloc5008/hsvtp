import { BaseEntity } from '../common/base_entity';
import { Post } from '../post/post.entity';
import { PostRequest } from '../post-request/post-request.entity';
import { User } from 'src/user/user.entity';
export declare class University extends BaseEntity {
    name: string;
    shortName: string;
    description: string;
    avatar?: string;
    post: Post[];
    postRequest: PostRequest[];
    user: User[];
}
