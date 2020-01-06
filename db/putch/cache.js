const mongoose = require('mongoose');

mongoose.Query.prototype.cache = function(options = {}) {
    const { ex, key } = options;

    this.cacheQuery = true;
    this.cacheKey = key || '';
    this.expireAge = ex || 10;
};