import { StorageProviderContract } from '@core/lib/storage/contracts';

/**
 * Represents a storage provider implementation for GCP.
 *
 * @class GcpStorageProvider
 * @implements StorageProviderContract
 */
export class GcpStorageProvider implements StorageProviderContract {
    /**
     * Uploads a file to the AWS storage.
     *
     * @param file - The file to upload.
     * @param path - The path to upload the file to.
     * @returns A Promise that resolves when the file is successfully uploaded.
     */
    put(file: File, path: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    /**
     * Downloads a file from the AWS storage.
     *
     * @param path - The path of the file to download.
     * @returns A Promise that resolves with the downloaded file.
     */
    download(path: string): Promise<File> {
        return Promise.resolve(undefined);
    }

    /**
     * Deletes a file from the AWS storage.
     *
     * @param path - The path of the file to delete.
     * @returns A Promise that resolves when the file is successfully deleted.
     */
    delete(path: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}
