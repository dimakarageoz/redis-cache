const redisClient = require('../../db/redis').client;

module.exports = function (req, res, next) {
    next();

    redisClient.del(req.user.id);
};