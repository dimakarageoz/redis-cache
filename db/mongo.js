const mongoose = require('mongoose');
const keys = require('../config/keys');

require('./putch/cache');
require('./putch/exec');

exports.connect = mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true });

