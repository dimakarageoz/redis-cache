const server = require('./src/server');
const db = require('./db/mongo');

db.connect
    .then(() => {
        server.listen(4000, () => console.log('Run http://localhost:4000'));
    })
    .catch((err) => {
        console.error(err);

        process.exit(1);
    })
;