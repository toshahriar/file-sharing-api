import { Sequelize } from 'sequelize';
import { ConnectionStatusEnum } from '@core/enums';

/**
 * Represents the common interface for database connections using Sequelize.
 *
 * @abstract
 */
export abstract class AbstractDatabaseConnection {
    /**
     * Map to store Sequelize instances for different named database connections.
     *
     * @protected
     * @type {Map<string, any>}
     */
    protected connections: Map<string, any>;

    /**
     * Constructor for AbstractDatabaseConnection.
     */
    protected constructor() {
        this.connections = new Map();
    }

    /**
     * Adds a new Sequelize database connection to the map.
     *
     * @abstract
     * @param {string} name - The name of the database connection.
     * @param {any} options - Connection options.
     * @param {any[]} [models] - An optional array of Sequelize models.
     * @returns {Sequelize} - The created Sequelize instance.
     */
    abstract addConnection(name: string, options: any, models?: any[]): Sequelize;

    /**
     * Retrieves a Sequelize database connection from the map.
     *
     * @abstract
     * @param {string} name - The name of the database connection.
     * @returns {Sequelize} - The Sequelize instance for the specified connection.
     * @throws {Error} - If the connection with the given name does not exist.
     */
    abstract getConnection(name: string): Sequelize;

    /**
     * Retrieves the status of a Sequelize database connection.
     *
     * @abstract
     * @param {string} name - The name of the database connection.
     * @returns {ConnectionStatusEnum} - The status of the database connection.
     */
    abstract getConnectionStatus(name: string): ConnectionStatusEnum;

    /**
     * Checks if a Sequelize database connection is currently connected.
     *
     * @abstract
     * @param {string} name - The name of the database connection.
     * @returns {boolean} - `true` if connected, `false` otherwise.
     */
    abstract isConnected(name: string): boolean;

    /**
     * Checks if a named Sequelize database connection exists in the map.
     *
     * @abstract
     * @param {string} name - The name of the database connection.
     * @returns {boolean} - `true` if the connection exists, `false` otherwise.
     */
    abstract hasConnection(name: string): boolean;

    /**
     * Removes a named Sequelize database connection from the map.
     *
     * @abstract
     * @param {string} name - The name of the database connection to remove.
     */
    abstract removeConnection(name: string): void;

    /**
     * Removes all Sequelize database connections from the map.
     *
     * @abstract
     */
    abstract removeAllConnections(): void;
}
