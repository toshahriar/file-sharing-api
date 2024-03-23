import { config } from '@core/lib/config';
import rateLimit from 'express-rate-limit';
import { MiddlewareContract } from '@core/contracts';
import { NextFunction, Request, Response } from 'express';

/**
 * DownloadLimitMiddleware class implements MiddlewareContract and handles rate limiting for file downloads.
 *
 * @class DownloadLimitMiddleware
 * @implements MiddlewareContract
 */
export class DownloadLimitMiddleware implements MiddlewareContract {
    /**
     * Download rate limit configuration.
     *
     * @private
     */
    private readonly downloadLimit: any;

    /**
     * Initializes a new instance of DownloadLimitMiddleware.
     *
     * @param {number} maxDownloads - The maximum number of successful downloads per day per IP address.
     */
    constructor(maxDownloads: number = config('storage.rateLimit.download')) {
        this.downloadLimit = rateLimit({
            windowMs: 24 * 60 * 60 * 1000, // 24 hours
            max: maxDownloads,
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
        this.downloadLimit(req, res, next);
    };
}
