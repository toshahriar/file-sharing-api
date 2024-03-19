import { RedisService } from '@core/lib/redis';

/**
 * AbstractCacheRepository class providing a common structure for cache repositories.
 * @abstract
 * @class AbstractCacheRepository
 */
export abstract class AbstractCacheRepository {
    /**
     * Property to hold the Redis cache service.
     * @protected
     * @type {RedisService} cache - Redis cache service instance.
     */
    protected cache: RedisService;

    /**
     * Constructor for the AbstractCacheRepository class.
     * Initializes the cache property by creating a new instance of the RedisService.
     */
    constructor() {
        this.cache = new RedisService(this.connection());
    }

    /**
     * Abstract method to be implemented by concrete classes.
     * Should return the connection name for the cache.
     * @abstract
     * @returns {string} Connection name for the cache.
     */
    abstract connection(): string;
}
