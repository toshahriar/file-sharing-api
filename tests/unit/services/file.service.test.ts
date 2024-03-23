import { FileDto } from '../../../src/app/dtos/v1';
import { FileService } from '../../../src/app/services/v1';
import { FileRepository } from '../../../src/app/repositories/v1';

/**
 * Unit tests for the FileService class.
 */
describe('FileService', (): void => {
    /**
     * Instance of FileService class for testing.
     * @type {FileService}
     */
    let fileService: FileService;

    /**
     * Instance of FileRepository class for testing.
     * @type {FileRepository}
     */
    let fileRepository: FileRepository;

    beforeEach((): void => {
        fileRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findWhere: jest.fn(),
            delete: jest.fn(),
        } as unknown as jest.Mocked<FileRepository>;

        fileService = new FileService(fileRepository);
    });

    /**
     * Tests the create method of FileService.
     */
    describe('create', (): void => {
        it('should call fileRepository.create with the provided DTO', async () => {
            const dto: FileDto = new FileDto();
            await fileService.create(dto);
            expect(fileRepository.create).toHaveBeenCalledWith(dto);
        });
    });

    /**
     * Tests the get method of FileService.
     */
    describe('get', () => {
        it('should call fileRepository.findById with the provided ID', async () => {
            const fileId: string = 'exampleId';
            await fileService.get(fileId);
            expect(fileRepository.findById).toHaveBeenCalledWith(fileId);
        });
    });

    /**
     * Tests the getByPrivatekey method of FileService.
     */
    describe('getByPrivatekey', () => {
        it('should call fileRepository.findWhere with the provided private key', async () => {
            const privateKey: string = 'examplePrivateKey';
            await fileService.getByPrivatekey(privateKey);
            expect(fileRepository.findWhere).toHaveBeenCalledWith({ privateKey });
        });
    });

    /**
     * Tests the getByPublickey method of FileService.
     */
    describe('getByPublickey', () => {
        it('should call fileRepository.findWhere with the provided public key', async () => {
            const publicKey: string = 'examplePublicKey';
            await fileService.getByPublickey(publicKey);
            expect(fileRepository.findWhere).toHaveBeenCalledWith({ publicKey });
        });
    });

    /**
     * Tests the delete method of FileService.
     */
    describe('delete', () => {
        it('should call fileRepository.delete with the provided ID', async () => {
            const fileId: string = 'exampleId';
            await fileService.delete(fileId);
            expect(fileRepository.delete).toHaveBeenCalledWith(fileId);
        });
    });
});
