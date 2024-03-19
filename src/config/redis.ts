module.exports = {
    cache: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || '6379',
        password: process.env.REDIS_PASSWORD || 'secret',
        family: parseInt(process.env.REDIS_FAMILY || '4'),
        db: process.env.REDIS_DATABASE || '0',
        lazyConnect: process.env.REDIS_LAZY_CONNECT || 'true',
        retryStrategy(times) {
            return Math.min(times * 50, 2000);
        },
    },
};
