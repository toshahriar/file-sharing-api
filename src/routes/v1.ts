import { middleware } from '@app/middlewares';
import { AbstractRouter } from '@core/abstracts';
import { fileController, healthCheckController } from '@app/controllers/v1';

/**
 * Version 1 Router for registering routes.
 *
 * @class V1Route
 * @extends {AbstractRouter}
 */
export class V1Route extends AbstractRouter {
    /**
     * Registers routes for version 1.
     */
    register(): void {
        // Health check API endpoint
        this.router.get('/health-check', healthCheckController.index);

        // Files API endpoint
        this.router.post(
            '/files',
            middleware(['fileUpload', 'uploadLimit']),
            fileController.upload
        );
        this.router.get(
            '/files/:publicKey',
            middleware(['downloadLimit']),
            fileController.download
        );
        this.router.delete('/files/:privateKey', fileController.delete);
    }
}
