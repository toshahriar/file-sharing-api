import { App } from '@app/index';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Entry point: Create an instance of the App class and start the HTTP server.
 *
 * @returns {void}
 */
((): void => {
    const app: App = new App();
    app.startHttp();
})();
