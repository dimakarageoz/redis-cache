const server = require('./src/server');
const db = require('./db/mongo');
const keys = require('./config/keys');

db.connect
    .then(() => {
        server.listen(keys.PORT, () => console.log(`Run http://localhost:${keys.PORT}`));
    })
    .catch((err) => {
        console.error(err);

        process.exit(1);
    })
;