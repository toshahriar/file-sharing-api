import cors from 'cors';
import bodyParser from 'body-parser';
import { Application } from 'express';
import { MiddlewareType } from '@core/types';
import {
    DownloadLimitMiddleware,
    FileUploadMiddleware,
    UploadLimitMiddleware,
} from '@app/middlewares/v1';

/**
 * MiddlewareProvider class handles registration of global and route-specific middlewares.
 *
 * @class MiddlewareProvider
 */
export class MiddlewareProvider {
    /**
     * Express application instance.
     *
     * @protected
     */
    protected app: Application;

    /**
     * Array containing registered global middlewares.
     *
     * @protected
     */
    protected globalMiddlewares: MiddlewareType[];

    /**
     * Constructs a new MiddlewareProvider instance.
     *
     * @param app The Express application instance.
     */
    constructor(app: Application) {
        this.app = app;
        this.globalMiddlewares = this.registerGlobalMiddlewares();
    }

    /**
     * Static method to register route-specific middlewares.
     *
     * @returns An object containing registered route middlewares.
     */
    static registerRouteMiddlewares(): object {
        return {
            fileUpload: new FileUploadMiddleware().handle,
            uploadLimit: new UploadLimitMiddleware().handle,
            downloadLimit: new DownloadLimitMiddleware().handle,
        };
    }

    /**
     * Registers global middlewares such as CORS, body-parser.urlencoded, and body-parser.json.
     *
     * @returns An array of registered global middlewares.
     */
    registerGlobalMiddlewares(): MiddlewareType[] {
        return [
            cors({
                origin: '*',
            }),
            bodyParser.urlencoded({ extended: true }),
            bodyParser.json(),
        ];
    }

    /**
     * Registers global middlewares with the Express application.
     */
    register(): void {
        this.app.use(this.globalMiddlewares);
    }
}
