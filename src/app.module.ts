import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UniversityModule } from './university/university.module';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { PostModule } from './post/post.module';
import { PostRequestModule } from './post-request/post-request.module';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UserModule,
        UniversityModule,
        S3Module,
        PostModule,
        PostRequestModule,
    ],
    controllers: [AppController],
    providers: [AppService, S3Service],
})
export class AppModule {}
