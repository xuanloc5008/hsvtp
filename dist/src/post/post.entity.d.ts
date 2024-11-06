import { BaseEntity } from '../common';
import { PostRequest } from '../post-request/post-request.entity';
import { University } from '../university/university.entity';
export declare class Post extends BaseEntity {
    university_id: string;
    title: string;
    content: string;
    postRequest: PostRequest;
    university: University;
}
