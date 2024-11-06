import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    GetObjectCommand,
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
} from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-provider-env';
import { Readable } from 'stream';
import 'dotenv/config';
import { NewSuccessResponse } from '../common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;
    private readonly bucket: string;

    constructor() {
        this.bucket = process.env.S3_BUCKET;
        this.s3Client = new S3Client({
            endpoint: process.env.S3_URL,
            region: 'us-east-1',
            credentials: fromEnv(),
            forcePathStyle: true,
        });
    }

    async uploadFile(
        key: string,
        file: Buffer | Readable,
        contentType: string,
    ) {
        try {
            const uploadParams: PutObjectCommandInput = {
                Bucket: this.bucket,
                Key: key,
                Body: file,
                ContentType: contentType,
                ACL: 'public-read', // Make the file publicly accessible
            };

            const command = new PutObjectCommand(uploadParams);
            await this.s3Client.send(command);

            return NewSuccessResponse(
                `${process.env.S3_URL}/${process.env.S3_BUCKET}/${key}`,
            );
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new InternalServerErrorException('File upload failed');
        }
    }

    async generatePresignedReadUrl(keys: string[], expiresIn: number = 3600) {
        try {
            const urls = await Promise.all(
                keys.map(async (key) => {
                    const command = new GetObjectCommand({
                        Bucket: this.bucket,
                        Key: key,
                    });
                    return await getSignedUrl(this.s3Client, command, {
                        expiresIn,
                    });
                }),
            );
            return NewSuccessResponse(urls);
        } catch (error) {
            console.log('Error generating presigned URLs:', error);
            throw new InternalServerErrorException(
                'Presigned URL generation failed',
            );
        }
    }
}
