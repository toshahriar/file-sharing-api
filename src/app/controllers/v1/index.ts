import { FileController } from '@app/controllers/v1/file.controller';
import { HealthCheckController } from '@app/controllers/v1/health-check.controller';

// Controllers
const healthCheckController: HealthCheckController = new HealthCheckController();
const fileController: FileController = new FileController();

export { healthCheckController, fileController };
