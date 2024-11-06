import {
    Controller,
    Get,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const key = `${Date.now()}-${file.originalname}`;
        return this.s3Service.uploadFile(key, file.buffer, file.mimetype);
    }

    @Get()
    async getUrlsForKeys(@Query('keys') keys: string) {
        const keysArray = keys.split(',');
        return this.s3Service.generatePresignedReadUrl(keysArray, 37000);
    }
}
