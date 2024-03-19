import { Sequelize } from 'sequelize';
import { logger } from '@core/lib/logger';
import { ConnectionStatusEnum } from '@core/enums';
import { AbstractDatabaseConnection } from '@core/lib/sequelize/abstracts';

/**
 * Represents the data associated with a Sequelize database connection.
 *
 * @interface
 */
interface ConnectionData {
    /**
     * The Sequelize instance representing the database connection.
     *
     * @type {Sequelize}
     */
    connection: Sequelize;

    /**
     * The status of the Sequelize database connection.
     *
     * @type {ConnectionStatusEnum}
     */
    status: ConnectionStatusEnum;

    /**
     * Indicates whether the Sequelize database connection is currently connected.
     *
     * @type {boolean}
     */
    isConnected: boolean;
}

/**
 * Manages Sequelize database connections and provides methods to interact with them.
 * Extends AbstractDatabaseConnection for common database connection functionality.
 */
export class DatabaseConnectionManager extends AbstractDatabaseConnection {
    /**
     * Singleton instance of DatabaseConnectionManager.
     *
     * @private
     * @type {DatabaseConnectionManager}
     */
    private static instance: DatabaseConnectionManager;

    /**
     * Retrieves or creates the singleton instance of DatabaseConnectionManager.
     *
     * @static
     * @returns {DatabaseConnectionManager} - The singleton instance of DatabaseConnectionManager.
     */
    static getInstance(): DatabaseConnectionManager {
        if (!DatabaseConnectionManager.instance) {
            DatabaseConnectionManager.instance = new DatabaseConnectionManager();
        }
        return DatabaseConnectionManager.instance;
    }

    /**
     * Adds a new Sequelize database connection to the map.
     *
     * @param {string} name - The name of the database connection.
     * @param {any} options - Connection options for Sequelize.
     * @param {any[]} [models] - An optional array of Sequelize models.
     * @returns {Sequelize} - The created Sequelize instance.
     * @throws {Error} - If the connection with the given name already exists.
     */
    addConnection(name: string, options: any, models?: any[]): Sequelize {
        if (this.connections.has(name)) {
            throw new Error(`Sequelize connection "${name}" already exists.`);
        }

        const sequelize: Sequelize = new Sequelize(options);

        const connectionData: ConnectionData = {
            connection: sequelize,
            status: ConnectionStatusEnum.CONNECTING,
            isConnected: false,
        };

        if (models && models.length) {
            models.forEach((model) => {
                model.initialize(sequelize);
            });
        }

        sequelize
            .authenticate()
            .then(async (): Promise<void> => {
                await sequelize.sync();
                connectionData.status = ConnectionStatusEnum.CONNECTED;
                logger(`${name}_database_ready`, `Database [${name}] connection is ready`).info();
            })
            .catch((err: Error) => {
                connectionData.status = ConnectionStatusEnum.DISCONNECTED;
                logger(`${name}_database_error`, `Database [${name}] error occurred`, err).error();
            })
            .finally(() => {
                connectionData.isConnected =
                    connectionData.status === ConnectionStatusEnum.CONNECTED;
            });

        this.connections.set(name, connectionData);

        return sequelize;
    }

    /**
     * Retrieves a Sequelize database connection from the map.
     *
     * @param {string} name - The name of the database connection.
     * @returns {Sequelize} - The Sequelize instance for the specified connection.
     * @throws {Error} - If the connection with the given name does not exist or is not connected.
     */
    getConnection(name: string): Sequelize {
        const connectionData = this.connections.get(name);
        if (!connectionData || connectionData.status !== ConnectionStatusEnum.CONNECTED) {
            throw new Error(`Sequelize connection "${name}" does not exist or is not connected.`);
        }

        return connectionData.connection;
    }

    /**
     * Retrieves the status of a Sequelize database connection.
     *
     * @param {string} name - The name of the database connection.
     * @returns {ConnectionStatusEnum} - The status of the database connection.
     */
    getConnectionStatus(name: string): ConnectionStatusEnum {
        const connectionData = this.connections.get(name);
        return connectionData ? connectionData.status : ConnectionStatusEnum.DISCONNECTED;
    }

    /**
     * Checks if a Sequelize database connection is currently connected.
     *
     * @param {string} name - The name of the database connection.
     * @returns {boolean} - `true` if connected, `false` otherwise.
     */
    isConnected(name: string): boolean {
        const connectionData = this.connections.get(name);
        return connectionData ? connectionData.isConnected : false;
    }

    /**
     * Checks if a named Sequelize database connection exists in the map.
     *
     * @param {string} name - The name of the database connection.
     * @returns {boolean} - `true` if the connection exists, `false` otherwise.
     */
    hasConnection(name: string): boolean {
        return this.connections.has(name);
    }

    /**
     * Removes a named Sequelize database connection from the map.
     *
     * @param {string} name - The name of the database connection to remove.
     */
    removeConnection(name: string): void {
        const connectionData = this.connections.get(name);
        if (connectionData) {
            connectionData.connection.close();
            this.connections.delete(name);
        }
    }

    /**
     * Removes all Sequelize database connections from the map.
     */
    removeAllConnections(): void {
        for (const [, connectionData] of this.connections) {
            connectionData.connection.close();
        }

        this.connections.clear();
    }
}
