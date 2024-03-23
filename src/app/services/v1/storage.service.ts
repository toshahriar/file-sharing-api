import { config } from '@core/lib/config';
import { StorageManager } from '@core/lib/storage';
import { StorageProviderContract } from '@core/lib/storage/contracts';

/**
 * Service for file operations.
 * @class StorageService
 */
export class StorageService {
    /**
     * The storage provider used by the FileService for file operations.
     */
    private storage: StorageProviderContract;

    /**
     * Constructs a new StorageService instance.
     * Initializes the storage provider based on the configured default, or uses the provided storage manager if provided.
     *
     * @param {StorageProviderContract} storageManager - Optional storage manager to use for file operations.
     */
    constructor(storageManager: StorageProviderContract = null) {
        if (storageManager) {
            this.storage = storageManager;
        } else {
            this.storage = StorageManager.get(config('storage.default'));
        }
    }

    /**
     * Uploads a file.
     * @param file - The file to upload.
     * @param uuid - The UUID to use for storing the file.
     * @returns A Promise that resolves with information about the stored file.
     */
    async upload(file: any, uuid: string): Promise<any> {
        return this.storage.put(file, uuid);
    }

    /**
     * Downloads a file.
     * @param path - The path of the file to download.
     * @returns A Promise that resolves with the downloaded file.
     */
    async download(path: string): Promise<any> {
        return this.storage.download(path);
    }

    /**
     * Deletes a file.
     * @param path - The path of the file to delete.
     * @returns A Promise that resolves when the file is successfully deleted.
     */
    async delete(path: string): Promise<any> {
        return this.storage.delete(path);
    }
}
