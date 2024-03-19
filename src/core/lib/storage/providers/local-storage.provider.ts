import * as path from 'path';
import { promises as fs, createReadStream } from 'fs';
import { config } from '@core/lib/config';
import { StorageProviderContract } from '@core/lib/storage/contracts';

/**
 * Represents a storage provider implementation for Local.
 *
 * @class LocalStorageProvider
 * @implements StorageProviderContract
 */
export class LocalStorageProvider implements StorageProviderContract {
    /**
     * Uploads a file to the AWS storage.
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
            const filePath: string = path.join(config('storage.disks.local.path'), fileName);
            await this.ensureDirectoryExists(config('storage.disks.local.path'));
            await fs.writeFile(filePath, file.buffer);
            return { fileName: fileName, path: filePath, mimeType: file.mimetype, size: file.size };
        } catch (error) {
            throw new Error('Failed to upload file: ' + error.message);
        }
    }

    /**
     * Downloads a file from the AWS storage.
     *
     * @param path - The path of the file to download.
     * @returns A Promise that resolves with the downloaded file.
     */
    async download(path: string): Promise<any> {
        await this.ensureDirectoryExists(config('storage.disks.local.path'));
        try {
            return createReadStream(path);
        } catch (error) {
            console.log(error);

            if (error.code === 'ENOENT') {
                throw new Error('File not found');
            }
            throw error;
        }
    }

    /**
     * Deletes a file from the AWS storage.
     *
     * @param path - The path of the file to delete.
     * @returns A Promise that resolves when the file is successfully deleted.
     */
    async delete(path: string): Promise<any> {
        await this.ensureDirectoryExists(config('storage.disks.local.path'));
        try {
            await fs.unlink(path);
            return true;
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error('File not found');
            }
            throw error;
        }
    }

    /**
     * Ensures the existence of a directory at the specified path. If the directory does not exist, it creates it.
     *
     * @param path - The path of the directory to ensure existence.
     * @returns A Promise that resolves once the directory is ensured to exist.
     */
    async ensureDirectoryExists(path: string): Promise<void> {
        try {
            await fs.access(path);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(path, { recursive: true });
            } else {
                throw error;
            }
        }
    }
}
