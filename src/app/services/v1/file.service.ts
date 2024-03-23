import { FileDto } from '@app/dtos/v1';
import { FileRepository } from '@app/repositories/v1';

/**
 * Service class for managing files.
 *
 * @class FileService
 */
export class FileService {
    /**
     * Repository for file operations.
     *
     * @private
     * @type {FileRepository}
     */
    private fileRepository: FileRepository;

    /**
     * Creates an instance of FileService.
     */
    constructor(fileRepository: FileRepository = null) {
        if (fileRepository) {
            this.fileRepository = fileRepository;
        } else {
            this.fileRepository = new FileRepository();
        }
    }

    /**
     * Creates a new file record.
     *
     * @param {FileDto} dto - The DTO containing file information.
     * @returns {Promise<any>} A Promise that resolves when the file record is created.
     */
    create(dto: FileDto): Promise<any> {
        return this.fileRepository.create(dto.toObject());
    }

    /**
     * Retrieves a file record by ID.
     *
     * @param {string} id - The ID of the file record to retrieve.
     * @returns {Promise<any>} A Promise that resolves with the retrieved file record.
     */
    get(id: string): Promise<any> {
        return this.fileRepository.findById(id);
    }

    getByPrivatekey(privateKey: string): Promise<any> {
        return this.fileRepository.findWhere({ privateKey: privateKey });
    }

    getByPublickey(publicKey: string): Promise<any> {
        return this.fileRepository.findWhere({ publicKey: publicKey });
    }

    /**
     * Deletes a file record by ID.
     *
     * @param {string} id - The ID of the file record to delete.
     * @returns {Promise<any>} A Promise that resolves when the file record is deleted.
     */
    delete(id: string): Promise<any> {
        return this.fileRepository.delete(id);
    }
}
