/**
 * Represents a contract for a storage provider.
 *
 * @interface StorageProviderContract
 */
export interface StorageProviderContract {
    /**
     * Uploads a file to the storage provider.
     * @param file - The file to upload.
     * @param path - The path to upload the file to.
     * @returns any
     */
    put(file: File, path: string): any;

    /**
     * Downloads a file from the storage provider.
     * @param path - The path of the file to download.
     * @returns any
     */
    download(path: string): any;

    /**
     * Deletes a file from the storage provider.
     * @param path - The path of the file to delete.
     * @returns any
     */
    delete(path: string): any;
}
