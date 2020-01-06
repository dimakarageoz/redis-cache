const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');

const mainRouter = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const sessionOptions = {
    secret: 'session secret',
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days alive
    cookie: {}
};

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sessionOptions.cookie.secure = true; // serve secure cookies

    app.use(helmet());
    app.use(helmet.noCache());
    app.use(compression());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionOptions));

app.use('/', mainRouter);

app.use((err, req, res, next) => {
    const message = err.timeout ? 'Request timeout' : err.message;

    res.status(err.status || 500).json({ message });
});

module.exports = app;