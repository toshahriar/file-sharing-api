import { Request, Response, NextFunction } from 'express';

/**
 * MiddlewareContract interface defines the structure of middleware classes.
 *
 * @interface MiddlewareContract
 */
export interface MiddlewareContract {
    /**
     * Handles incoming requests.
     *
     * @param {Request} req The Express request object.
     * @param {Response} res The Express response object.
     * @param {NextFunction} next The next middleware function in the stack.
     * @returns {void}
     */
    handle(req: Request, res: Response, next: NextFunction): void;
}
