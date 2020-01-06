const constants = require('./constants');

exports.validation = function (name, value, options = {}) {
    const errors = [];
    const titleName = name[0].toUpperCase() + name.slice(1);

    if (options && options.required && !value) {
        errors.push({
            type: 'required',
            message: `${titleName} has to be exist.`
        });
    }

    if (options && options.length && typeof value === 'string') {
        if (options.length.min
            && value.length < options.length.min
        ) {
            const minCharacters = options.length.min > 1 ? 'characters' : 'character';

            errors.push({
                type: 'minLength',
                message: `Minimum length of ${titleName} is ${options.length.min} ${minCharacters}.`
            })
        }

        if (options.length.max
            && value.length > options.length.max
        ) {
            const maxСharacters = options.length.min > 1 ? 'characters' : 'character';

            errors.push({
                type: 'maxLength',
                message: `${titleName} length must not exceed ${options.length.max} ${maxСharacters}.`
            });
        }
    }

    if (options.email
        && typeof value === 'string'
        && !value.match(constants.EMAIL_PATTERN)
    ) {
        errors.push({
            type: 'email',
            message: `Invalid email address`
        });
    }

    return errors.length ? errors : null;
};