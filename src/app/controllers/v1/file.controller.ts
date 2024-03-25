import { FileDto } from '@app/dtos/v1';
import { logger } from '@core/lib/logger';
import { HttpStatusEnum } from '@core/enums';
import { responder } from '@core/lib/responder';
import { FileValidator } from '@app/validators/v1';
import { ResponseStatusEnum } from '@core/lib/responder/enums';
import { CryptoService, FileService, StorageService } from '@app/services/v1';

/**
 * Controller class for handling file-related operations.
 *
 * @class FileController
 */
export class FileController {
    /**
     * Service for file operations.
     *
     * @private
     * @type {FileService}
     */
    private fileService: FileService;

    /**
     * Service for storage operations.
     *
     * @private
     * @type {StorageService}
     */
    private storageService: StorageService;

    /**
     * Service for cryptographic operations.
     *
     * @private
     * @type {CryptoService}
     */
    private cryptoService: CryptoService;

    /**
     * Creates an instance of FileController.
     */
    constructor() {
        this.fileService = new FileService();
        this.storageService = new StorageService();
        this.cryptoService = new CryptoService();
    }

    /**
     * Handles file upload request.
     *
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response from the upload operation.
     */
    upload = async (req: any, res: any): Promise<any> => {
        try {
            // Validate request
            let validation = new FileValidator().validate(req);
            if (validation.fails()) {
                logger(
                    'file_upload_error',
                    'File upload validation error.',
                    validation?.errors?.errors ?? null
                ).error();

                return responder(res, HttpStatusEnum.UNPROCESSABLE_ENTITY, ResponseStatusEnum.ERROR)
                    .message('File upload validation error occurred!')
                    .data(validation?.errors?.errors ?? null)
                    .error();
            }

            // Prepare DTO
            let dto: FileDto = new FileDto();

            // Upload file
            const file: any = await this.storageService.upload(req.file, dto.id);

            // Generate key pair and signature
            const keyPair: any = this.cryptoService.generateKeyPair();
            const signature: string = this.cryptoService.createSignature(
                dto.id,
                keyPair.privateKey
            );

            // Update dto
            dto = new FileDto({
                ...dto,
                ...file,
                publicKey: Buffer.from(keyPair.publicKey).toString('base64'),
                privateKey: Buffer.from(keyPair.privateKey).toString('base64'),
                signature: signature,
                ipAddress: req.ip,
            });

            // Save file information to the database
            const data: any = await this.fileService.create(dto);

            logger('file_upload_success', 'File uploaded successfully.', { fileId: dto.id }).info();

            return responder(res, HttpStatusEnum.CREATED, ResponseStatusEnum.SUCCESS)
                .message(HttpStatusEnum.CREATED_MESSAGE)
                .data(data)
                .success();
        } catch (err: any) {
            logger('file_upload_error', err?.message ?? 'File upload error occurred!', err).error();

            return responder(res, HttpStatusEnum.INTERNAL_SERVER_ERROR, ResponseStatusEnum.ERROR)
                .message(err?.message ?? 'File upload error occurred!')
                .data(err ?? null)
                .error();
        }
    };

    /**
     * Handles file download request.
     *
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response from the download operation.
     */
    download = async (req: any, res: any): Promise<any> => {
        try {
            // Validate request params
            const publicKey = req.params.publicKey;
            if (!publicKey) {
                logger('file_download_error', 'File download validation error.').error();

                return responder(res, HttpStatusEnum.UNPROCESSABLE_ENTITY, ResponseStatusEnum.ERROR)
                    .message('Public key not provided for file download.')
                    .error();
            }

            // Retrieve file information from the database using the public key
            const file = await this.fileService.getByPublickey(publicKey);
            if (!file) {
                logger('file_download_error', 'File not found with associated public key.').error();

                return responder(res, HttpStatusEnum.NOT_FOUND, ResponseStatusEnum.ERROR)
                    .message('File not found with associated public key.')
                    .error();
            }

            // Verify signature of the file
            const decodedPublicKey: string = Buffer.from(publicKey, 'base64').toString('utf8');
            const isVerified: boolean = this.cryptoService.verifySignature(
                file.id,
                file.signature,
                decodedPublicKey
            );
            if (!isVerified && publicKey !== file.publicKey) {
                logger('file_download_error', 'Signature verification failed.').error();

                return responder(res, HttpStatusEnum.BAD_REQUEST, ResponseStatusEnum.ERROR)
                    .message('Signature verification failed.')
                    .data({ fileId: file.id })
                    .error();
            }

            // Send the file contents as the response
            const downloadableFile = await this.storageService.download(file.path);

            // Set the response header for the download
            res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
            res.setHeader('Content-Type', file.mimeType);

            // Download file from the read stream
            downloadableFile.pipe(res);

            logger('file_download_success', 'File downloaded successfully.', {
                fileId: file.id,
            }).info();
        } catch (err: any) {
            logger(
                'file_download_error',
                err?.message ?? 'File download error occurred!',
                err
            ).error();

            return responder(res, HttpStatusEnum.INTERNAL_SERVER_ERROR, ResponseStatusEnum.ERROR)
                .message(err?.message ?? 'File download error occurred!')
                .data(err ?? null)
                .error();
        }
    };

    /**
     * Handles file deletion request.
     *
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response from the delete operation.
     */
    delete = async (req: any, res: any): Promise<any> => {
        try {
            // Validate request params.
            const privateKey = req.params.privateKey;
            if (!privateKey) {
                logger('file_delete_error', 'File delete validation error.').error();

                return responder(res, HttpStatusEnum.UNPROCESSABLE_ENTITY, ResponseStatusEnum.ERROR)
                    .message('Private key not provided for file deletion.')
                    .error();
            }

            // Retrieve file information from the database using the public key
            const file = await this.fileService.getByPrivatekey(privateKey);
            if (!file) {
                logger('file_delete_error', 'File not found with associated private key.').error();

                return responder(res, HttpStatusEnum.NOT_FOUND, ResponseStatusEnum.ERROR)
                    .message('File not found with associated private key.')
                    .error();
            }

            // Verify signature of the file
            const decodedPublicKey: string = Buffer.from(file.publicKey, 'base64').toString('utf8');
            const isVerified: boolean = this.cryptoService.verifySignature(
                file.id,
                file.signature,
                decodedPublicKey
            );
            if (!isVerified && privateKey !== file.privateKey) {
                logger('file_delete_error', 'Signature verification failed.').error();

                return responder(res, HttpStatusEnum.BAD_REQUEST, ResponseStatusEnum.ERROR)
                    .message('Signature verification failed.')
                    .data({ fileId: file.id })
                    .error();
            }

            // Delete the file record from the database
            const deletedFile = await this.fileService.delete(file.id);
            if (!deletedFile) {
                logger('file_delete_error', "File couldn't be deleted.").error();

                return responder(res, HttpStatusEnum.BAD_REQUEST, ResponseStatusEnum.ERROR)
                    .message("File couldn't be deleted.")
                    .data({ fileId: file.id })
                    .error();
            }

            await this.storageService.delete(file.path);

            logger('file_delete_success', 'File deleted successfully.', { fileId: file.id }).info();

            return responder(res, HttpStatusEnum.NO_CONTENT, ResponseStatusEnum.SUCCESS)
                .message('File has been deleted.')
                .success();
        } catch (err: any) {
            logger('file_delete_error', err?.message ?? 'File delete error occurred!', err).error();

            return responder(res, HttpStatusEnum.INTERNAL_SERVER_ERROR, ResponseStatusEnum.ERROR)
                .message(err?.message ?? 'File delete error occurred!')
                .data(err ?? null)
                .error();
        }
    };
}
