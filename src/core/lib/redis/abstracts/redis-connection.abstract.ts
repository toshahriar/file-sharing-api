import { Redis, RedisOptions } from 'ioredis';
import { ConnectionStatusEnum } from '@core/enums';

/**
 * Abstract class representing a connection to Redis.
 */
export abstract class AbstractRedisConnection {
    /**
     * Map to store connections.
     */
    protected connections: Map<string, any>;

    /**
     * Constructor to initialize the connections map.
     */
    protected constructor() {
        this.connections = new Map();
    }

    /**
     * Abstract method to add a connection to Redis.
     * @param name - The name of the connection.
     * @param options - The options for the connection.
     * @returns The Redis instance representing the connection.
     */
    abstract addConnection(name: string, options: RedisOptions): Redis;

    /**
     * Abstract method to get a connection by name.
     * @param name - The name of the connection.
     * @returns The Redis instance representing the connection.
     */
    abstract getConnection(name: string): Redis;

    /**
     * Abstract method to get the connection status.
     * @param name - The name of the connection.
     * @returns The status of the connection.
     */
    abstract getConnectionStatus(name: string): ConnectionStatusEnum;

    /**
     * Abstract method to check if a connection is connected.
     * @param name - The name of the connection.
     * @returns True if the connection is connected, false otherwise.
     */
    abstract isConnected(name: string): boolean;

    /**
     * Abstract method to check if a connection exists.
     * @param name - The name of the connection.
     * @returns True if the connection exists, false otherwise.
     */
    abstract hasConnection(name: string): boolean;

    /**
     * Abstract method to remove a connection by name.
     * @param name - The name of the connection to remove.
     */
    abstract removeConnection(name: string): void;

    /**
     * Abstract method to remove all connections.
     */
    abstract removeAllConnections(): void;
}
