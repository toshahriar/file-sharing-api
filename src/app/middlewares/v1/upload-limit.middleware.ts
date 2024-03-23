import rateLimit from 'express-rate-limit';
import { MiddlewareContract } from '@core/contracts';
import { NextFunction, Request, Response } from 'express';
import { config } from '@core/lib/config';

/**
 * UploadLimitMiddleware class implements MiddlewareContract and handles rate limiting for file uploads.
 *
 * @class UploadLimitMiddleware
 * @implements MiddlewareContract
 */
export class UploadLimitMiddleware implements MiddlewareContract {
    /**
     * Upload rate limit configuration.
     *
     * @private
     */
    private readonly uploadLimit: any;

    /**
     * Initializes a new instance of UploadLimitMiddleware.
     *
     * @param {number} maxUploads - The maximum number of successful uploads per day per IP address.
     */
    constructor(maxUploads: number = config('storage.rateLimit.upload')) {
        this.uploadLimit = rateLimit({
            windowMs: 24 * 60 * 60 * 1000,
            max: maxUploads,
            skipFailedRequests: true,
        });
    }

    /**
     * Handles incoming requests.
     *
     * @param req The Express request object.
     * @param res The Express response object.
     * @param next The next middleware function in the stack.
     */
    handle = (req: Request, res: Response, next: NextFunction): void => {
        this.uploadLimit(req, res, next);
    };
}
