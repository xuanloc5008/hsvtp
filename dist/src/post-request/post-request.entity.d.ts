import { BaseEntity } from '../common';
import { Post } from '../post/post.entity';
import { University } from '../university/university.entity';
export declare enum PostRequestStatus {
    Pending = 0,
    Accepted = 1,
    Rejected = 2
}
export declare class PostRequest extends BaseEntity {
    post_id: string;
    university_receiver_id: string;
    status: PostRequestStatus;
    feedback: string;
    linkPost: string;
    post: Post;
    university: University;
}
