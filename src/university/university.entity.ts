import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common/base_entity';
import { Post } from '../post/post.entity';
import { PostRequest } from '../post-request/post-request.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class University extends BaseEntity {
    @ApiProperty({
        description: 'University Name',
        example: 'Ho Chi Minh University of Technology',
    })
    @Column()
    name: string;

    @Column()
    @ApiProperty({ description: 'University shortname', example: 'HCMUT' })
    shortName: string;

    @ApiProperty({ description: 'University Description' })
    @Column()
    description: string;

    @ApiProperty({ description: 'Url Of University Avatar' })
    @Column({ nullable: true })
    avatar?: string;

    @OneToMany(() => Post, (post) => post.university)
    post: Post[];

    @OneToMany(() => PostRequest, (postRequest) => postRequest.university)
    postRequest: PostRequest[];

    @OneToMany(() => User, (user) => user.university)
    user : User[]
}
