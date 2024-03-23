import multer from 'multer';
import { config } from '@core/lib/config';
import { responder } from '@core/lib/responder';
import { MiddlewareContract } from '@core/contracts';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusEnum, ResponseStatusEnum } from '@core/enums';

/**
 * FileMiddleware class implements MiddlewareContract and handles file-related operations.
 *
 * @class FileUploadMiddleware
 * @implements MiddlewareContract
 */
export class FileUploadMiddleware implements MiddlewareContract {
    /**
     * Multer instance for handling file uploads.
     *
     * @private
     */
    private readonly upload: any;

    /**
     * Initializes a new instance of FileUpload.
     *
     * @param {string} fieldName - The name of the field for file upload. Defaults to 'file'.
     */
    constructor(fieldName: string = 'file') {
        this.upload = multer({
            storage: multer.memoryStorage(),
            fileFilter: (req: any, file: any, cb: any) => {
                // File size validation (limit to 5MB)
                if (file.size > config('storage.maxFileSize')) {
                    return cb(new Error('File size exceeds the limit.'));
                }

                // If all validations pass, allow the file upload
                cb(null, true);
            },
        }).single(fieldName);
    }

    /**
     * Handles incoming requests.
     *
     * @param req The Express request object.
     * @param res The Express response object.
     * @param next The next middleware function in the stack.
     */
    handle = (req: Request, res: Response, next: NextFunction): void => {
        this.upload(req, res, (err: any): object => {
            // Handle file upload error
            if (err instanceof multer.MulterError) {
                return responder(res, HttpStatusEnum.BAD_REQUEST, ResponseStatusEnum.ERROR)
                    .message('Multer error: ' + err.message)
                    .error();
            } else if (err) {
                return responder(
                    res,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    ResponseStatusEnum.ERROR
                )
                    .message('Unknown error: ' + err.message)
                    .error();
            }

            // Pass request to the next middleware
            next();
        });
    };
}
