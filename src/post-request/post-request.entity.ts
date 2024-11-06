import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common';
import { IsUrl } from 'class-validator';
import { Post } from '../post/post.entity';
import { University } from '../university/university.entity';

export enum PostRequestStatus {
    Pending,
    Accepted,
    Rejected,
}

@Entity()
export class PostRequest extends BaseEntity {
    @Column({ type: 'uuid' })
    post_id: string;

    @Column({ type: 'uuid' })
    university_receiver_id: string;

    @Column({ type: 'int' , default: PostRequestStatus.Pending })
    status: PostRequestStatus;

    @Column({ type: 'text',  default: '' })
    feedback: string;

    @Column({ type: 'varchar',  default: '' })
    @IsUrl()
    linkPost: string;

    @ManyToOne(() => Post, (post) => post.postRequest)
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => University, (university) => university.postRequest)
    @JoinColumn({ name: 'university_receiver_id' })
    university: University;
}
