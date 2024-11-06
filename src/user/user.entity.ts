import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common';
import { Exclude } from 'class-transformer';
import { University } from 'src/university/university.entity';

export enum Role {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    UniversityManager = 'UniversityManager',
    User = 'User',
}

@Entity()
export class User extends BaseEntity {
    @Column({nullable: true})
    university_id: string;

    @ApiProperty({ description: 'username', type: String })
    @Column()
    username: string;

    @ApiProperty({ description: 'password', type: String })
    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @ApiProperty({ description: 'email', type: String })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ description: 'familyName', type: String })
    @Column()
    familyName: string;

    @ApiProperty({ description: 'givenName', type: String })
    @Column()
    givenName: string;

    @Column({ type: 'varchar', length: 50, array: true, default: [Role.User] })
    role: Role[];

    @ManyToOne(() => University, (university) => university.user, {nullable: true})
    @JoinColumn({ name: 'university_id' })
    university: University;
}

export interface AuthPayload {
    id: string;
    username: string;
    role: Role[];
}

export interface IJwtToken {
    token: string;
}
