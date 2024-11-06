import { Module, Post } from '@nestjs/common';
import { PostRequestController } from './post-request.controller';
import { PostRequestService } from './post-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRequest } from './post-request.entity';
import { University } from 'src/university/university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostRequest])],
  controllers: [PostRequestController],
  providers: [PostRequestService]
})
export class PostRequestModule {}
