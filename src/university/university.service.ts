import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from './university.entity';
import { UniversityCreate, UniversityUpdate } from './dtos';
import { DataSource, Repository } from 'typeorm';
import { ExceptionBadRequest, NewSuccessResponse } from '../common';
import { PageMetaDto } from '../common/dtos/pageMeta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageOptionDto } from '../common/dtos/pageOption.dto';

@Injectable()
export class UniversityService {
    constructor(
        @InjectRepository(University)
        private readonly universityRepo: Repository<University>,
        private readonly dataSource: DataSource,
    ) {}

    async createUniversity(data: UniversityCreate): Promise<University> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let entity = await this.dataSource.manager.findOneBy(University, {
                name: data.name,
            });

            if (entity) {
                throw new ExceptionBadRequest(
                    'This university name already existed',
                );
            }

            entity = await this.dataSource.manager.findOneBy(University, {
                shortName: data.shortName,
            });
            if (entity) {
                throw new ExceptionBadRequest(
                    'This university short name already existed',
                );
            }
            const res = await this.dataSource.manager.save(University, {
                ...data,
            });
            await queryRunner.commitTransaction();
            return res;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async updateUniversity(id: string, data: UniversityUpdate) {
        const university = await this.universityRepo.findOneBy({
            id,
        });
        if (!university) {
            throw new NotFoundException('University does not exist');
        }

        if (
            data.name != undefined &&
            (await this.universityRepo.findOneBy({ name: data.name }))
        ) {
            throw new ExceptionBadRequest('university name exists');
        }
        if (
            data.shortName != undefined &&
            (await this.universityRepo.findOneBy({ shortName: data.shortName }))
        ) {
            throw new ExceptionBadRequest('university shortname exists');
        }

        if (data.name != undefined) {
            university.name = data.name;
        }

        if (data.avatar != undefined) {
            university.avatar = data.avatar;
        }

        if (data.description != undefined) {
            university.description = data.description;
        }

        if (data.shortName != undefined) {
            university.shortName = data.shortName;
        }

        await this.universityRepo.save(university);

        return NewSuccessResponse('success');
    }

    async deleteUniversity(id: string) {
        await this.universityRepo.delete(id);
        return NewSuccessResponse('success');
    }

    async listUniversity(
        pageOption: PageOptionDto,
    ): Promise<PageDto<University>> {
        const queryBuilder =
            this.universityRepo.createQueryBuilder('university');
        queryBuilder
            .orderBy('university.id', pageOption.orderBy)
            .skip(pageOption.skip)
            .take(pageOption.take)
            .select([
                'university.id',
                'university.name',
                'university.shortName',
                'university.description',
                'university.avatar',
            ]);

        const totalItems = await queryBuilder.getCount();
        const listUniversity = (await queryBuilder.getRawAndEntities())
            .entities;
        const pageMeta = new PageMetaDto(totalItems, pageOption);
        return new PageDto<University>(listUniversity, pageMeta);
    }
}
