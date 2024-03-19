import { RedisConnectionManager } from '@core/lib/redis/redis-connection.manager';
import { RedisPipelineOperation, RedisService } from '@core/lib/redis/redis.service';

const redisConnectionManager: RedisConnectionManager = RedisConnectionManager.getInstance();

export { RedisService, RedisPipelineOperation, redisConnectionManager };
