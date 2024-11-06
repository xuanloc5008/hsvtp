/// <reference types="node" />
/// <reference types="node" />
import { Readable } from 'stream';
import 'dotenv/config';
export declare class S3Service {
    private readonly s3Client;
    private readonly bucket;
    constructor();
    uploadFile(key: string, file: Buffer | Readable, contentType: string): Promise<import("../common").SuccessResponse<any>>;
    generatePresignedReadUrl(keys: string[], expiresIn?: number): Promise<import("../common").SuccessResponse<any>>;
}
