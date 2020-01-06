const mongoose = require('mongoose');

require('./putch/cache');
require('./putch/exec');

const mongoUser = 'karageoz98';
const mongoPassword = '1199102gosha';

exports.connect = mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@clusterdk-3qqrj.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });

