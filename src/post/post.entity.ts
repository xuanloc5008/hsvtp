import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../common';
import { PostRequest } from '../post-request/post-request.entity';
import { University } from '../university/university.entity';

@Entity()
export class Post extends BaseEntity {
    @Column({ type: 'uuid' })
    university_id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @OneToMany(() => PostRequest, (postRequest) => postRequest.post)
    postRequest: PostRequest;

    @ManyToOne(() => University, (university) => university.post)
    @JoinColumn({ name: 'university_id' })
    university: University;
}
