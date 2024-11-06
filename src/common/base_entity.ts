import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({description: "id of entity"})
    id: string

    @Column()
    @CreateDateColumn()
    @ApiProperty({ description: "creation date of the entity" })
    created_at: Date

    @Column()
    @UpdateDateColumn()
    @ApiProperty({ description: "last update date of the entity" })
    updated_at: Date;
}