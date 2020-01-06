const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const redisUrl = keys.REDIS_URL;
const client = redis.createClient(redisUrl);

client.get = util.promisify(client.get);
client.hget = util.promisify(client.hget);

exports.client = client;
