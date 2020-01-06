const createError = require('http-errors');
const bcrypt = require('bcrypt');
const util = require('util');

const User = require('../models/user');

exports.loginUser = function (email, password) {
    let user;
    let bcryptCompare = bcrypt.compare;

    bcryptCompare = util.promisify(bcryptCompare);

    return new Promise((resolve, reject) => {
        User
            .findOne({ email })
            .select('+password')
            .then((mongoUser) => {
                if (!mongoUser) {
                    return reject(createError(400, `Invalid email or password.`))
                }

                user = mongoUser;
            })
            .then(() => bcryptCompare(password, user.password))
            .then((res) => {
                res
                    ? resolve(user)
                    : reject(createError(400, `Invalid email or password.`))
                ;
            })
            .catch((err) => {
                return reject(createError(500, err.message));
            })
        ;
    });
};

exports.signupUser = function (email, password) {
    const bcryptHash = util.promisify(bcrypt.hash);

    return new Promise((resolve, reject) => {
        User
            .findOne({ email })
            .then((res) => {
                res && reject(createError(400, `Email ${email} has engaged already.`));
            })
            .then(() => bcryptHash(password, 10))
            .then((res) => User.create({ email, password: res }))
            .then((newUser) => resolve({ email, id: newUser.id }))

            .catch((err) => {
                return reject(createError(500, err.message));
            })
    });
};