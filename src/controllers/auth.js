const createError = require('http-errors');
const validation = require('../utils/validation').validation;
const service = require('../services/auth');

exports.loginPage = function (req, res) {
    res.render('login')
};

exports.signupPage = function (req, res) {
    res.render('signup');
};

exports.login = async function (req, res) {
    const { email, password } = req.body;

    const emailErrors = validation('email', email, {
        required: true,
        length: { max: 255 },
        email: true
    });

    const passwordErrors = validation('password', password, {
        required: true,
        length: { min: 4, max: 255 }
    });

    const errors = emailErrors || passwordErrors;

    if (errors) {
        throw createError(400, errors[0].message);
    }

    service
        .loginUser(email, password)
        .then(({ password, ...user }) => {
            req.session.user = user;
            res.redirect('/')
        })
        .catch(({ status, message }) => res.status(status).send({ message }))
    ;
};

exports.signup = function (req, res) {
    const { email, password, confirmPassword } = req.body;

    const passwordOptions = {
        required: true,
        length: { min: 4, max: 255 }
    };

    const emailErrors = validation('email', email, {
        required: true,
        length: { max: 255 },
        email: true
    });

    const passwordErrors = validation('password', password, passwordOptions);
    const confirmErrors = validation('confirmation password', confirmPassword, passwordOptions);

    const errors = emailErrors || passwordErrors || confirmErrors;

    if (errors) {
        throw createError(400, errors[0].message);
    }

    if (confirmPassword !== password) {
        throw createError(400, 'Confirmation password has to match with origin password');
    }

    service
        .signupUser(email, password)
        .then((user) => {
            req.session.user = user;

            res.redirect('/');
        })
        .catch(({ status, message }) => res.status(status).send({ message }))
    ;
};

exports.logout = function (req, res) {
    delete req.session.user;

    res.redirect('/');
};