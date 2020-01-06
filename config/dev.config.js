module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.ENV.DB_URL || 'mongodb://127.0.0.1:27017/redis-cache-dev',
    REDIS_URL: 'redis://127.0.0.1:6379'
};