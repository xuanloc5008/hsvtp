/// <reference types="multer" />
import { S3Service } from './s3.service';
export declare class S3Controller {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    uploadFile(file: Express.Multer.File): Promise<import("../common").SuccessResponse<any>>;
    getUrlsForKeys(keys: string): Promise<import("../common").SuccessResponse<any>>;
}
