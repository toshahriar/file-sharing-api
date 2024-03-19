import { logger } from '@core/lib/logger';
import { Redis, RedisOptions } from 'ioredis';
import { ConnectionStatusEnum } from '@core/enums';
import { AbstractRedisConnection } from '@core/lib/redis/abstracts';

interface ConnectionData {
    connection: Redis;
    status: ConnectionStatusEnum;
    isConnected: boolean;
}

export class RedisConnectionManager extends AbstractRedisConnection {
    private static instance: RedisConnectionManager;

    private constructor() {
        super();
    }

    static getInstance(): RedisConnectionManager {
        if (!RedisConnectionManager.instance) {
            RedisConnectionManager.instance = new RedisConnectionManager();
        }
        return RedisConnectionManager.instance;
    }

    addConnection(name: string, options: RedisOptions): Redis {
        if (this.connections.has(name)) {
            throw new Error(`Redis connection '${name}' already exists.`);
        }

        const client = new Redis(options);
        const connectionData: ConnectionData = {
            connection: client,
            status: ConnectionStatusEnum.CONNECTING,
            isConnected: false,
        };

        client.connect().then(() => {
            connectionData.status = ConnectionStatusEnum.CONNECTED;
            connectionData.isConnected = true;
            logger(`${name}_redis_ready`, `Redis [${name}] is ready`).info();
        });

        client.on('connect', () => {
            logger(`${name}_redis_connect`, `Redis [${name}] is connected`).info();
        });

        client.on('error', (err) => {
            logger(`${name}_redis_error`, `Redis [${name}] error occurred`, err).error();
        });

        client.on('end', () => {
            logger(`${name}_redis_close`, `Redis [${name}] connection is closed`).info();
            this.connections.delete(name);
        });

        this.connections.set(name, connectionData);

        return client;
    }

    getConnection(name: string): Redis {
        const connectionData = this.connections.get(name);
        if (!connectionData) {
            throw new Error(`Redis connection '${name}' does not exist or is not connected.`);
        }

        return connectionData.connection;
    }

    getConnectionStatus(name: string): ConnectionStatusEnum {
        const connectionData = this.connections.get(name);
        return connectionData ? connectionData.status : ConnectionStatusEnum.DISCONNECTED;
    }

    isConnected(name: string): boolean {
        const connectionData = this.connections.get(name);
        return connectionData ? connectionData.isConnected : false;
    }

    hasConnection(name: string): boolean {
        return this.connections.has(name);
    }

    removeConnection(name: string): void {
        const connectionData = this.connections.get(name);
        if (connectionData) {
            connectionData.connection.disconnect();
            this.connections.delete(name);
        }
    }

    removeAllConnections(): void {
        for (const [, connectionData] of this.connections) {
            connectionData.connection.disconnect();
        }

        this.connections.clear();
    }
}
