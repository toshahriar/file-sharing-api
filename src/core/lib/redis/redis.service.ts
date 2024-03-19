import { ChainableCommander, Redis } from 'ioredis';
import { redisConnectionManager } from '@core/lib/redis';

/**
 * Represents a single operation in a Redis pipeline.
 * @interface RedisPipelineOperation
 * @property {string} command - The Redis command to be executed.
 * @property {any[]} args - An array containing the arguments for the Redis command.
 */
export interface RedisPipelineOperation {
    command: string;
    args: any[];
}

/**
 * Represents a service for interacting with Redis.
 */
export class RedisService {
    /**
     * The Redis connection instance.
     * @private
     * @readonly
     */
    private readonly connection: Redis;

    /**
     * Constructs a new RedisService instance.
     * @param {string} connectionName - The name of the Redis connection.
     * @throws {Error} Throws an error if the specified connection does not exist.
     */
    constructor(connectionName: string) {
        if (!redisConnectionManager.hasConnection(connectionName)) {
            throw new Error(`Redis connection '${connectionName}' does not exist.`);
        }

        this.connection = redisConnectionManager.getConnection(connectionName);
    }

    /**
     * Sets the string value of a key.
     * @param {string} key - The key to set.
     * @param {string} value - The value to set.
     * @returns {Promise<void>} A Promise that resolves when the operation is complete.
     */
    async set(key: string, value: string): Promise<void> {
        await this.connection.set(key, value);
    }

    /**
     * Gets the string value of a key.
     * @param {string} key - The key to get.
     * @returns {Promise<string | null>} A Promise that resolves with the value associated with the key, or null if the key does not exist.
     */
    async get(key: string): Promise<string | null> {
        return this.connection.get(key);
    }

    /**
     * Gets the values of multiple keys.
     * @param {string[]} keys - The keys to get values for.
     * @returns {Promise<string[]>} A Promise that resolves with an array of values corresponding to the provided keys.
     */
    async mget(keys: string[]): Promise<string[]> {
        return this.connection.mget(keys);
    }

    /**
     * Deletes a key.
     * @param {string} key - The key to delete.
     * @returns {Promise<number>} A Promise that resolves with the number of keys deleted (0 or 1).
     */
    async delete(key: string): Promise<number> {
        return this.connection.del(key);
    }

    /**
     * Checks if a key exists.
     * @param {string} key - The key to check.
     * @returns {Promise<boolean>} A Promise that resolves with true if the key exists, otherwise false.
     */
    async exists(key: string): Promise<boolean> {
        return (await this.connection.exists(key)) === 1;
    }

    /**
     * Gets the time-to-live for a key.
     * @param {string} key - The key to check.
     * @returns {Promise<number>} A Promise that resolves with the time-to-live of the key, in seconds.
     */
    async ttl(key: string): Promise<number> {
        return this.connection.ttl(key);
    }

    /**
     * Gets the value associated with a field in a hash stored at the specified key.
     * @param {string} key - The key of the hash.
     * @param {string} field - The field to get the value for.
     * @returns {Promise<string | null>} A Promise that resolves with the value associated with the field, or null if either the key or the field do not exist.
     */
    async hget(key: string, field: string): Promise<string | null> {
        return this.connection.hget(key, field);
    }

    /**
     * Sets the string value of a field in a hash stored at the specified key.
     * @param {string} key - The key of the hash.
     * @param {string} field - The field to set.
     * @param {string} value - The value to set.
     * @returns {Promise<number>} A Promise that resolves with 1 if the field is a new field in the hash and value was set, 0 if the field already existed and the value was updated.
     */
    async hset(key: string, field: string, value: string): Promise<number> {
        return this.connection.hset(key, field, value);
    }

    /**
     * Gets all the fields and values of the hash stored at the specified key.
     * @param {string} key - The key of the hash.
     * @returns {Promise<{ [key: string]: string }>} A Promise that resolves with an object containing all the fields and values of the hash.
     */
    async hgetall(key: string): Promise<{ [key: string]: string }> {
        return this.connection.hgetall(key);
    }

    /**
     * Checks if a field exists in a hash stored at the specified key.
     * @param {string} key - The key of the hash.
     * @param {string} field - The field to check.
     * @returns {Promise<number>} A Promise that resolves with 1 if the field exists in the hash, otherwise 0.
     */
    async hexists(key: string, field: string): Promise<number> {
        return this.connection.hexists(key, field);
    }

    /**
     * Deletes one or more fields from a hash stored at the specified key.
     * @param {string} key - The key of the hash.
     * @param {...string} fields - The fields to delete.
     * @returns {Promise<number>} A Promise that resolves with the number of fields that were removed from the hash, not including specified but non-existing fields.
     */
    async hdel(key: string, ...fields: string[]): Promise<number> {
        return this.connection.hdel(key, ...fields);
    }

    /**
     * Inserts all the specified values at the head of the list stored at the specified key.
     * @param {string} key - The key of the list.
     * @param {...string} values - The values to insert.
     * @returns {Promise<number>} A Promise that resolves with the length of the list after the push operation.
     */
    async lpush(key: string, ...values: string[]): Promise<number> {
        return this.connection.lpush(key, ...values);
    }

    /**
     * Removes and returns the first element of the list stored at the specified key.
     * @param {string} key - The key of the list.
     * @returns {Promise<string | null>} A Promise that resolves with the value of the first element, or null if the list is empty or does not exist.
     */
    async lpop(key: string): Promise<string | null> {
        return this.connection.lpop(key);
    }

    /**
     * Inserts all the specified values at the tail of the list stored at the specified key.
     * @param {string} key - The key of the list.
     * @param {...string} values - The values to insert.
     * @returns {Promise<number>} A Promise that resolves with the length of the list after the push operation.
     */
    async rpush(key: string, ...values: string[]): Promise<number> {
        return this.connection.rpush(key, ...values);
    }

    /**
     * Removes and returns the last element of the list stored at the specified key.
     * @param {string} key - The key of the list.
     * @returns {Promise<string | null>} A Promise that resolves with the value of the last element, or null if the list is empty or does not exist.
     */
    async rpop(key: string): Promise<string | null> {
        return this.connection.rpop(key);
    }

    /**
     * Returns all the members of the set stored at the specified key.
     * @param {string} key - The key of the set.
     * @returns {Promise<string[]>} A Promise that resolves with an array of all the members of the set.
     */
    async smembers(key: string): Promise<string[]> {
        return this.connection.smembers(key);
    }

    /**
     * Checks if the specified member is a member of the set stored at the specified key.
     * @param {string} key - The key of the set.
     * @param {string} member - The member to check for.
     * @returns {Promise<number>} A Promise that resolves with 1 if the member is a member of the set, otherwise 0.
     */
    async sismember(key: string, member: string): Promise<number> {
        return this.connection.sismember(key, member);
    }

    /**
     * Returns the number of elements in the set stored at the specified key.
     * @param {string} key - The key of the set.
     * @returns {Promise<number>} A Promise that resolves with the cardinality (number of elements) of the set.
     */
    async scard(key: string): Promise<number> {
        return this.connection.scard(key);
    }

    /**
     * Adds one or more members to the set stored at the specified key.
     * @param {string} key - The key of the set.
     * @param {...string} members - The members to add.
     * @returns {Promise<number>} A Promise that resolves with the number of elements added to the set (not including all the specified members already existing).
     */
    async sadd(key: string, ...members: string[]): Promise<number> {
        return this.connection.sadd(key, ...members);
    }

    /**
     * Removes one or more members from the set stored at the specified key.
     * @param {string} key - The key of the set.
     * @param {...string} members - The members to remove.
     * @returns {Promise<number>} A Promise that resolves with the number of elements removed from the set (not including all the specified members not existing).
     */
    async srem(key: string, ...members: string[]): Promise<number> {
        return this.connection.srem(key, ...members);
    }

    /**
     * Adds one or more members with the specified scores to the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @param {number} score - The score to assign to each member being added.
     * @param {(string | number)} member - The member to add.
     * @returns {Promise<number>} A Promise that resolves with the number of elements added to the sorted set (not including all the specified members already existing).
     */
    async zadd(key: string, score: number, member: string | number): Promise<number> {
        return this.connection.zadd(key, score, member);
    }

    /**
     * Returns the score of the specified member in the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @param {(string | number)} member - The member to get the score for.
     * @returns {Promise<string | number | null>} A Promise that resolves with the score of the member, or null if the member is not in the sorted set.
     */
    async zscore(key: string, member: string | number): Promise<string | number | null> {
        return this.connection.zscore(key, member);
    }

    /**
     * Returns the rank of the specified member in the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @param {(string | number)} member - The member to get the rank for.
     * @returns {Promise<number | null>} A Promise that resolves with the rank of the member, or null if the member is not in the sorted set.
     */
    async zrank(key: string, member: string | number): Promise<number | null> {
        return this.connection.zrank(key, member);
    }

    /**
     * Returns the reverse rank of the specified member in the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @param {(string | number)} member - The member to get the reverse rank for.
     * @returns {Promise<number | null>} A Promise that resolves with the reverse rank of the member, or null if the member is not in the sorted set.
     */
    async zrevrank(key: string, member: string | number): Promise<number | null> {
        return this.connection.zrevrank(key, member);
    }

    /**
     * Returns the specified range of elements in the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @param {number} start - The start index (0-based) of the range.
     * @param {number} stop - The stop index (0-based) of the range.
     * @returns {Promise<string[]>} A Promise that resolves with an array of elements in the specified range.
     */
    async zrange(key: string, start: number, stop: number): Promise<string[]> {
        return this.connection.zrange(key, start, stop);
    }

    /**
     * Returns the specified range of elements in the sorted set stored at the specified key, in reverse order.
     * @param {string} key - The key of the sorted set.
     * @param {number} start - The start index (0-based) of the range.
     * @param {number} stop - The stop index (0-based) of the range.
     * @returns {Promise<string[]>} A Promise that resolves with an array of elements in the specified range, in reverse order.
     */
    async zrevrange(key: string, start: number, stop: number): Promise<string[]> {
        return this.connection.zrevrange(key, start, stop);
    }

    /**
     * Returns all the elements in the sorted set stored at the specified key with a score within the given range.
     * @param {string} key - The key of the sorted set.
     * @param {number | string} min - The minimum score (inclusive) of the range.
     * @param {number | string} max - The maximum score (inclusive) of the range.
     * @returns {Promise<string[]>} A Promise that resolves with an array of elements with scores in the specified range.
     */
    async zrangebyscore(
        key: string,
        min: number | string,
        max: number | string
    ): Promise<string[]> {
        return this.connection.zrangebyscore(key, min, max);
    }

    /**
     * Returns all the elements in the sorted set stored at the specified key with a score within the given range, in reverse order.
     * @param {string} key - The key of the sorted set.
     * @param {number | string} max - The maximum score (inclusive) of the range.
     * @param {number | string} min - The minimum score (inclusive) of the range.
     * @returns {Promise<string[]>} A Promise that resolves with an array of elements with scores in the specified range, in reverse order.
     */
    async zrevrangebyscore(
        key: string,
        max: number | string,
        min: number | string
    ): Promise<string[]> {
        return this.connection.zrevrangebyscore(key, max, min);
    }

    /**
     * Returns all the elements in the sorted set stored at the specified key with a score within the given range, with optional offset and limit.
     * @param {string} key - The key of the sorted set.
     * @param {number | string} min - The minimum score (inclusive) of the range.
     * @param {number | string} max - The maximum score (inclusive) of the range.
     * @param {number | string} [offset=0] - The offset of the first element to return.
     * @param {number | string} [limit=5] - The maximum number of elements to return.
     * @returns {Promise<string[]>} A Promise that resolves with an array of elements with scores in the specified range.
     */
    async zrangebyscorebylimit(
        key: string,
        min: number | string,
        max: number | string,
        offset: number | string = 0,
        limit: number | string = 5
    ): Promise<string[]> {
        return this.connection.zrangebyscore(key, min, max, 'LIMIT', offset, limit);
    }

    /**
     * Returns all the elements in the sorted set stored at the specified key with a score within the given range, in reverse order, with optional offset and limit.
     * @param {string} key - The key of the sorted set.
     * @param {number | string} max - The maximum score (inclusive) of the range.
     * @param {number | string} min - The minimum score (inclusive) of the range.
     * @param {number | string} [offset=0] - The offset of the first element to return.
     * @param {number | string} [limit=5] - The maximum number of elements to return.
     * @returns {Promise<string[]>} A Promise that resolves with an array of elements with scores in the specified range, in reverse order.
     */
    async zrevrangebyscorebylimit(
        key: string,
        max: number | string,
        min: number | string,
        offset: number | string = 0,
        limit: number | string = 5
    ): Promise<string[]> {
        return this.connection.zrevrangebyscore(key, max, min, 'LIMIT', offset, limit);
    }

    /**
     * Removes one or more members from the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @param {...string} members - The members to remove.
     * @returns {Promise<number>} A Promise that resolves with the number of members removed from the sorted set.
     */
    async zrem(key: string, ...members: string[]): Promise<number> {
        return this.connection.zrem(key, ...members);
    }

    /**
     * Returns the cardinality (number of elements) of the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @returns {Promise<number>} A Promise that resolves with the cardinality of the sorted set.
     */
    async zcard(key: string): Promise<number> {
        return this.connection.zcard(key);
    }

    /**
     * Returns the number of elements in the sorted set stored at the specified key with scores within the given range.
     * @param {string} key - The key of the sorted set.
     * @param {number | string} min - The minimum score of the range.
     * @param {number | string} max - The maximum score of the range.
     * @returns {Promise<number>} A Promise that resolves with the number of elements in the specified score range.
     */
    async zcount(key: string, min: number | string, max: number | string): Promise<number> {
        return this.connection.zcount(key, min, max);
    }

    /**
     * Returns all the elements in the sorted set stored at the specified key lexicographically between the specified minimum and maximum range.
     * @param {string} key - The key of the sorted set.
     * @param {string} min - The minimum value lexically.
     * @param {string} max - The maximum value lexically.
     * @returns {Promise<string[]>} A Promise that resolves with an array of elements within the specified lexicographical range.
     */
    async zrangebylex(key: string, min: string, max: string): Promise<string[]> {
        return this.connection.zrangebylex(key, min, max);
    }

    /**
     * Removes all elements in the sorted set stored at the specified key with rank between start and stop.
     * @param {string} key - The key of the sorted set.
     * @param {number} start - The start rank.
     * @param {number} stop - The stop rank.
     * @returns {Promise<number>} A Promise that resolves with the number of elements removed.
     */
    async zremrangebyrank(key: string, start: number, stop: number): Promise<number> {
        return this.connection.zremrangebyrank(key, start, stop);
    }

    /**
     * Removes all elements in the sorted set stored at the specified key with scores between the given values.
     * @param {string} key - The key of the sorted set.
     * @param {number | string} min - The minimum score.
     * @param {number | string} max - The maximum score.
     * @returns {Promise<number>} A Promise that resolves with the number of elements removed.
     */
    async zremrangebyscore(
        key: string,
        min: number | string,
        max: number | string
    ): Promise<number> {
        return this.connection.zremrangebyscore(key, min, max);
    }

    /**
     * Atomically pops and returns the specified number of smallest elements from the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @param {number} [count] - The number of elements to pop. If not specified, one element is popped.
     * @returns {Promise<string[]>} A Promise that resolves with an array of the popped elements.
     */
    async zpopmin(key: string, count?: number): Promise<string[]> {
        return this.connection.zpopmin(key, count);
    }

    /**
     * Atomically pops and returns the specified number of largest elements from the sorted set stored at the specified key.
     * @param {string} key - The key of the sorted set.
     * @param {number} [count] - The number of elements to pop. If not specified, one element is popped.
     * @returns {Promise<string[]>} A Promise that resolves with an array of the popped elements.
     */
    async zpopmax(key: string, count?: number): Promise<string[]> {
        return this.connection.zpopmax(key, count);
    }

    /**
     * Computes the union of multiple sorted sets and stores the result in the destination key.
     * @param {string} destination - The key of the destination sorted set.
     * @param {number} numkeys - The number of keys to union.
     * @param {...string} keys - The keys of the sorted sets to union.
     * @returns {Promise<number>} A Promise that resolves with the number of elements in the resulting sorted set.
     */
    async zunionstore(destination: string, numkeys: number, ...keys: string[]): Promise<number> {
        return this.connection.zunionstore(destination, numkeys, ...keys);
    }

    /**
     * Computes the intersection of multiple sorted sets and stores the result in the destination key.
     * @param {string} destination - The key of the destination sorted set.
     * @param {number} numkeys - The number of keys to intersect.
     * @param {...string} keys - The keys of the sorted sets to intersect.
     * @returns {Promise<number>} A Promise that resolves with the number of elements in the resulting sorted set.
     */
    async zinterstore(destination: string, numkeys: number, ...keys: string[]): Promise<number> {
        return this.connection.zinterstore(destination, numkeys, ...keys);
    }

    /**
     * Executes a sequence of Redis commands as a transaction using pipelines.
     * @param {Array<RedisPipelineOperation>} operations - An array of Redis pipeline operations.
     * @returns {Promise<any[]>} A Promise that resolves with an array containing the results of all commands in the pipeline.
     */
    async pipeline(operations: Array<RedisPipelineOperation>): Promise<any[]> {
        const pipeline: ChainableCommander = this.connection.pipeline();

        operations.forEach((operation) => {
            const { command, args } = operation;
            const redisCommand = pipeline[command].bind(pipeline);

            redisCommand(...args);
        });

        return pipeline.exec();
    }
}
