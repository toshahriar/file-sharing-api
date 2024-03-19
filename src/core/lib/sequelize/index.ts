import { DatabaseConnectionManager } from '@core/lib/sequelize/database-connection.manager';

const databaseConnectionManager: DatabaseConnectionManager =
    DatabaseConnectionManager.getInstance();

export { databaseConnectionManager };
