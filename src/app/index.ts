import * as cron from 'node-cron';
import { config } from '@core/lib/config';
import { Kernel } from '@core/lib/web/kernel';
import { File as FileModel } from '@app/models';
import { CronService } from '@app/services/v1';
import { redisConnectionManager } from '@core/lib/redis';
import { databaseConnectionManager } from '@core/lib/sequelize';

/**
 * App class extends Kernel and represents the application entry point.
 *
 * @class App
 * @extends Kernel
 */
export class App extends Kernel {
    /**
     * Constructs a new App instance.
     * Initializes the Express application, sets up middlewares, routes, database, redis and cron.
     */
    constructor() {
        super();
        this.bootstrapDatabase();
        this.bootstrapRedis();
        this.bootstrapCron();
    }

    /**
     * Starts the HTTP server.
     */
    startHttp(): void {
        super.startHttp(config('app.httpPort'));
    }

    /**
     * Starts the HTTPS server.
     */
    startHttps(): void {
        super.startHttps(config('app.httpsPort'), config('app.certPath'), config('app.keyPath'));
    }

    /**
     * Bootstrap database.
     */
    bootstrapDatabase(): void {
        databaseConnectionManager.addConnection('mysql', config('database.mysql'), [FileModel]);
    }

    /**
     * Bootstrap Redis.
     */
    bootstrapRedis(): void {
        redisConnectionManager.addConnection('cache', config('redis.cache'));
    }

    /**
     * Bootstrap Cron.
     */
    bootstrapCron(): void {
        cron.schedule('* * * * *', async (): Promise<void> => {
            await new CronService().cleanOldFiles();
        });
    }
}
