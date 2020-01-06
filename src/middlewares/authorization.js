module.exports = function (req, res, next) {
    if (
        req.url.indexOf('/auth') === -1
        && (
            !req.session
            || !req.session.user
        )
    ) {
        return res.redirect('/auth/login');
    }

    next();
};