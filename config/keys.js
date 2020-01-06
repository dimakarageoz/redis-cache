switch (process.env.NOVE_ENV) {
    case 'production':
        module.exports = require('./prod.config');
        break;

    default:
        module.exports = require('./dev.config');
}