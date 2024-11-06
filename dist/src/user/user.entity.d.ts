import { BaseEntity } from '../common';
import { University } from 'src/university/university.entity';
export declare enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    UniversityManager = "UniversityManager",
    User = "User"
}
export declare class User extends BaseEntity {
    university_id: string;
    username: string;
    password: string;
    salt: string;
    email: string;
    familyName: string;
    givenName: string;
    role: Role[];
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
