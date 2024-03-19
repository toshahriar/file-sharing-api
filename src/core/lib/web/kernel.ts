import * as fs from 'fs';
import { V1Route } from '@routes/v1';
import express, { Application } from 'express';
import http, { Server as HttpServer } from 'http';
import https, { Server as HttpsServer } from 'https';
import { MiddlewareProvider } from '@app/middlewares';
import { logger } from '@core/lib/logger';

/**
 * Kernel class initializes and manages the Express application.
 *
 * @class Kernel
 */
export class Kernel {
    /**
     * Express application instance.
     *
     * @protected
     */
    protected app: Application;

    /**
     * HTTP or HTTPS server instance.
     *
     * @protected
     */
    protected server: HttpServer | HttpsServer;

    /**
     * Constructs a new Kernel instance.
     * Initializes the Express application, sets up middlewares, and routes.
     */
    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupRoutes();
    }

    /**
     * Starts the HTTP server.
     *
     * @param port The port to listen on.
     */
    startHttp(port: number): void {
        this.server = http.createServer(this.app);
        this.server.listen(port, (): void => {
            logger(
                'application_started',
                `HTTP Server is running on port ${port}. URL: http://localhost:${port}/`
            ).info();
        });
    }

    /**
     * Starts the HTTPS server.
     *
     * @param port The port to listen on.
     * @param certPath The path to the SSL certificate file.
     * @param keyPath The path to the SSL key file.
     */
    startHttps(port: number, certPath: string, keyPath: string): void {
        const options: https.ServerOptions = {
            cert: fs.readFileSync(certPath),
            key: fs.readFileSync(keyPath),
        };
        this.server = https.createServer(options, this.app);
        this.server.listen(port, (): void => {
            logger(
                'application_started',
                `HTTPS Server is running on port ${port}. URL: https://localhost:${port}/`
            ).info();
        });
    }

    /**
     * Sets up middleware functions.
     *
     * @protected
     */
    protected setupMiddlewares(): void {
        new MiddlewareProvider(this.app).register();
    }

    /**
     * Sets up routes for the application.
     *
     * @protected
     */
    protected setupRoutes(): void {
        this.app.use('/api/v1', new V1Route().getRouter());
    }
}
