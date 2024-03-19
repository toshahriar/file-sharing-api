import { config } from "@core/lib/config";
import { StorageProviderContract } from '@core/lib/storage/contracts';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

/**
 * Represents a storage provider implementation for AWS.
 *
 * @class AwsStorageProvider
 * @implements StorageProviderContract
 */
export class AwsStorageProvider implements StorageProviderContract {
    /**
     * The S3 client instance.
     *
     * @private
     * @type {S3Client}
     */
    private client: S3Client;

    /**
     * Initializes the AWS S3 storage provider with the provided configuration.
     */
    constructor() {
        this.client = new S3Client(config('storage.disks.aws'));
    }

    /**
     * Uploads a file to the AWS S3 storage.
     *
     * @param file - The file to upload.
     * @param uuid - The path to upload the file to.
     * @returns A Promise that resolves when the file is successfully uploaded.
     */
    async put(file: any, uuid: string): Promise<any> {
        try {
            const parts = file.originalname.split('.');
            const fileExt = parts[parts.length - 1];
            const fileName: string = `${uuid}.${fileExt}`;
            await this.client.send(
                new PutObjectCommand({
                    Bucket: config('storage.disks.aws.bucket'),
                    Key: fileName,
                    Body: file.buffer,
                })
            );
            return {fileName: fileName, path: fileName, mimeType: file.mimetype, size: file.size};
        } catch (error) {
            throw error;
        }
    }

    /**
     * Downloads a file from the AWS S3 storage.
     *
     * @param path - The path of the file to download.
     * @returns A Promise that resolves with the downloaded file as a Buffer.
     */
    async download(path: string): Promise<any> {
        try {
            return (
                await this.client.send(
                    new GetObjectCommand({
                        Bucket: config('storage.disks.aws.bucket'),
                        Key: path,
                    }),
                )
            ).Body;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a file from the AWS S3 storage.
     *
     * @param path - The path of the file to delete.
     * @returns A Promise that resolves when the file is successfully deleted.
     */
    async delete(path: string): Promise<void> {
        try {
            await this.client.send(new DeleteObjectCommand({
                Bucket: config('storage.disks.aws.bucket'),
                Key: path,
            }));
        } catch (error) {
            throw error;
        }
    }
}
