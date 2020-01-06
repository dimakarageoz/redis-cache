const mongoose = require('mongoose');
const redisClient = require('../redis').client;

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
    if (!this.cacheQuery) {
        return exec.apply(this, arguments);
    }

    const collection = this.mongooseCollection.name;
    const key =  JSON.stringify(
        Object.assign({}, this.getQuery(), { collection })
    );

    const result = await redisClient.hget(this.cacheKey, key);

    if (result) {
        const data = JSON.parse(result);

        return Array.isArray(data)
            ? data.map(d => new this.model(d))
            : new this.model(data)
        ;
    }

    return exec.apply(this, arguments)
        .then((data) => {
            redisClient.hset(this.cacheKey, key, JSON.stringify(data), 'EX', this.expireAge);

            return data;
        })
    ;
};