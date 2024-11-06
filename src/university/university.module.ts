import {Global, Module} from '@nestjs/common';
import {UniversityController} from './university.controller';
import {UniversityService} from "./university.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {University} from "./university.entity";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([University])],
    controllers: [UniversityController],
    providers: [UniversityService],
    exports: [UniversityService]
})
export class UniversityModule {
}
