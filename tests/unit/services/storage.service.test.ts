import { StorageService } from '../../../src/app/services/v1';
import { StorageProviderContract } from '../../../src/core/lib/storage/contracts';

/**
 * Unit tests for the StorageService class.
 */
describe('StorageService', (): void => {
    /**
     * Mocked storage provider.
     * @type {jest.Mocked<StorageProviderContract>}
     */
    let storageProvider: jest.Mocked<StorageProviderContract>;

    /**
     * Instance of StorageService class for testing.
     * @type {StorageService}
     */
    let storageService: StorageService;

    beforeEach((): void => {
        storageProvider = {
            put: jest.fn(),
            download: jest.fn(),
            delete: jest.fn(),
        } as unknown as jest.Mocked<StorageProviderContract>;

        storageService = new StorageService(storageProvider);
    });

    /**
     * Tests the upload method of StorageService.
     */
    describe('upload', (): void => {
        it('should call storage provider put method with file and uuid', async (): Promise<void> => {
            const file: any = {}; // Mock file object
            const uuid: any = 'exampleUuid';
            await storageService.upload(file, uuid);
            expect(storageProvider.put).toHaveBeenCalledWith(file, uuid);
        });
    });

    /**
     * Tests the download method of StorageService.
     */
    describe('download', (): void => {
        it('should call storage provider download method with provided path', async (): Promise<void> => {
            const path: any = 'examplePath';
            await storageService.download(path);
            expect(storageProvider.download).toHaveBeenCalledWith(path);
        });
    });

    /**
     * Tests the delete method of StorageService.
     */
    describe('delete', (): void => {
        it('should call storage provider delete method with provided path', async (): Promise<void> => {
            const path: any = 'examplePath';
            await storageService.delete(path);
            expect(storageProvider.delete).toHaveBeenCalledWith(path);
        });
    });
});
