import { FileDto } from '../../../src/app/dtos/v1';
import { AbstractDTO } from '../../../src/core/abstracts';

/**
 * Unit tests for the FileDto class.
 */
describe('FileDto', (): void => {
    /**
     * Verifies that FileDto is an instance of AbstractDTO.
     */
    it('should be an instance of AbstractDTO', (): void => {
        const fileDto: FileDto = new FileDto();
        expect(fileDto).toBeInstanceOf(AbstractDTO);
    });

    /**
     * Verifies that properties are initialized with default values if no data is provided.
     */
    it('should initialize properties with default values if no data provided', (): void => {
        const fileDto: FileDto = new FileDto();
        expect(fileDto.id).toBeDefined();
        expect(fileDto.fileName).toBe('');
        expect(fileDto.path).toBe('');
        expect(fileDto.size).toBe('');
        expect(fileDto.mimeType).toBe('');
        expect(fileDto.publicKey).toBe('');
        expect(fileDto.privateKey).toBe('');
        expect(fileDto.signature).toBe('');
        expect(fileDto.ipAddress).toBe('');
    });

    /**
     * Verifies that properties are initialized with provided data.
     */
    it('should initialize properties with provided data', (): void => {
        const data: any = {
            id: '123',
            fileName: 'example.txt',
            path: '/path/to/file',
            size: '1024',
            mimeType: 'text/plain',
            publicKey: 'publicKey',
            privateKey: 'privateKey',
            signature: 'signature',
            ipAddress: '127.0.0.1',
        };
        const fileDto: FileDto = new FileDto(data);
        expect(fileDto.id).toBe(data.id);
        expect(fileDto.fileName).toBe(data.fileName);
        expect(fileDto.path).toBe(data.path);
        expect(fileDto.size).toBe(data.size);
        expect(fileDto.mimeType).toBe(data.mimeType);
        expect(fileDto.publicKey).toBe(data.publicKey);
        expect(fileDto.privateKey).toBe(data.privateKey);
        expect(fileDto.signature).toBe(data.signature);
        expect(fileDto.ipAddress).toBe(data.ipAddress);
    });
});
