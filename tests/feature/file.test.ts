import fs from 'fs';
import axios from 'axios';
import path from 'path';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Base path for API requests.
 */
const apiBasePath: string = 'http://app:3000';

/**
 * Name of the test file.
 */
const testFileName: string = 'test.txt';

/**
 * Directory path for mock files.
 */
const mockFilesDirectory: string = path.join(process.env.MOCK_STORAGE_PATH || '', 'files');

/**
 * Directory path for mock downloads.
 */
const mockDownloadsDirectory: string = path.join(process.env.MOCK_STORAGE_PATH || '', 'downloads');

/**
 * Directory path for local storage.
 */
const localStorageDirectory: string = process.env.FILE_STORAGE_PATH || '';

/**
 * Set up mock directories before running tests.
 */
beforeAll((): void => {
    createDirectoryIfNotExists(mockFilesDirectory);
    createDirectoryIfNotExists(mockDownloadsDirectory);
    createTestFile();
});

/**
 * Clean up mock directories after all tests are done.
 */
afterAll((): void => {
    removeDirectoryIfExists(mockFilesDirectory);
    removeDirectoryIfExists(mockDownloadsDirectory);
    removeDirectoryIfExists(localStorageDirectory);
});

/**
 * Test suite for file upload functionality.
 */
describe('File Upload Tests', (): void => {
    /**
     * Test file upload.
     */
    it('Should upload files.', async (): Promise<void> => {
        const response = await uploadFile(testFileName);
        expect(response?.data?.data?.publicKey).toBeDefined();
        expect(response?.data?.data?.privateKey).toBeDefined();
        expect(response.status).toBe(201);
    });
});

/**
 * Test suite for file download functionality.
 */
describe('File Download Tests', (): void => {
    /**
     * Test file download with public key.
     */
    it('Should download file with public key.', async (): Promise<void> => {
        const uploadResponse = await uploadFile(testFileName);
        const downloadResponse = await downloadFile(uploadResponse.data.data.publicKey);
        expect(downloadResponse.status).toBe(200);
    });

    /**
     * Test file download with private/invalid key.
     */
    it('Should not download file with private/invalid key.', async (): Promise<void> => {
        const uploadResponse = await uploadFile(testFileName);
        await expect(downloadFile(uploadResponse.data.data.privateKey)).rejects.toThrow();
    });
});

/**
 * Test suite for file deletion functionality.
 */
describe('File Deletion Tests', (): void => {
    /**
     * Test file deletion with private key.
     */
    it('Should delete file with private key.', async (): Promise<void> => {
        const uploadResponse = await uploadFile(testFileName);
        const deleteResponse = await deleteFile(uploadResponse.data.data.privateKey);
        expect(deleteResponse.status).toBe(204);
    });

    /**
     * Test file deletion with public/invalid key.
     */
    it('Should not delete file with public/invalid key.', async (): Promise<void> => {
        const uploadResponse = await uploadFile(testFileName);
        await expect(deleteFile(uploadResponse.data.data.publicKey)).rejects.toThrow();
    });
});

/**
 * Creates directory if it does not exist.
 *
 * @param directoryPath - The path of the directory to create.
 */
function createDirectoryIfNotExists(directoryPath: string): void {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

/**
 * Removes directory if it exists.
 *
 * @param directoryPath - The path of the directory to remove.
 */
function removeDirectoryIfExists(directoryPath: string): void {
    if (fs.existsSync(directoryPath)) {
        fs.rmdirSync(directoryPath, { recursive: true });
    }
}

/**
 * Creates a test file in the mock file directory.
 */
function createTestFile(): void {
    const testFilePath: string = path.join(mockFilesDirectory, testFileName);
    fs.writeFileSync(testFilePath, 'ABC');
}

/**
 * Uploads a file to the server.
 *
 * @param filename - The name of the file to upload.
 * @returns A promise representing the upload response.
 */
async function uploadFile(filename: string): Promise<any> {
    const file: string = path.join(mockFilesDirectory, filename);
    const formData: FormData = new FormData();
    formData.append('file', fs.createReadStream(file));
    const headers: FormData.Headers = formData.getHeaders();
    try {
        return await axios.post(`${apiBasePath}/api/v1/files`, formData, { headers });
    } finally {
        formData.destroy();
    }
}

/**
 * Downloads a file from the server.
 *
 * @param publicKey - The public key of the file to download.
 * @returns A promise representing the download response.
 */
async function downloadFile(publicKey: string): Promise<any> {
    const response: any = await axios.get(`${apiBasePath}/api/v1/files/${publicKey}`, {
        responseType: 'stream',
    });
    response.data.on('end', () => response.data.destroy());
    return response;
}

/**
 * Deletes a file from the server.
 *
 * @param privateKey - The private key of the file to delete.
 * @returns A promise representing the deletion response.
 */
async function deleteFile(privateKey: string): Promise<any> {
    return await axios.delete(`${apiBasePath}/api/v1/files/${privateKey}`);
}
