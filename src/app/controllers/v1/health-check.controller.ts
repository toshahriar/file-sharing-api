import { config } from '@core/lib/config';
import { logger } from '@core/lib/logger';
import { responder } from '@core/lib/responder';
import { HttpStatusEnum, ResponseStatusEnum } from '@core/enums';

/**
 * Controller for handling health check requests
 *
 * @class HealthCheckController
 */
export class HealthCheckController {
    /**
     * Handles health check request
     *
     * @param req {any} HTTP request
     * @param res {any} HTTP response
     * @returns {any} response
     */
    index = (req: any, res: any): any => {
        const data: object = {
            app_name: config('app.name'),
            app_version: config('app.version'),
        };

        logger('health_check', 'Application is running!', data).info();

        return responder(
            res,
            HttpStatusEnum.OK,
            ResponseStatusEnum.SUCCESS,
            'Application is running!'
        )
            .data(data)
            .success();
    };
}
