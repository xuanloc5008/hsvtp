"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const credential_provider_env_1 = require("@aws-sdk/credential-provider-env");
require("dotenv/config");
const common_2 = require("../common");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3Service = class S3Service {
    constructor() {
        this.bucket = process.env.S3_BUCKET;
        this.s3Client = new client_s3_1.S3Client({
            endpoint: process.env.S3_URL,
            region: 'us-east-1',
            credentials: (0, credential_provider_env_1.fromEnv)(),
            forcePathStyle: true,
        });
    }
    async uploadFile(key, file, contentType) {
        try {
            const uploadParams = {
                Bucket: this.bucket,
                Key: key,
                Body: file,
                ContentType: contentType,
                ACL: 'public-read',
            };
            const command = new client_s3_1.PutObjectCommand(uploadParams);
            await this.s3Client.send(command);
            return (0, common_2.NewSuccessResponse)(`${process.env.S3_URL}/${process.env.S3_BUCKET}/${key}`);
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw new common_1.InternalServerErrorException('File upload failed');
        }
    }
    async generatePresignedReadUrl(keys, expiresIn = 3600) {
        try {
            const urls = await Promise.all(keys.map(async (key) => {
                const command = new client_s3_1.GetObjectCommand({
                    Bucket: this.bucket,
                    Key: key,
                });
                return await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
                    expiresIn,
                });
            }));
            return (0, common_2.NewSuccessResponse)(urls);
        }
        catch (error) {
            console.log('Error generating presigned URLs:', error);
            throw new common_1.InternalServerErrorException('Presigned URL generation failed');
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
//# sourceMappingURL=s3.service.js.map