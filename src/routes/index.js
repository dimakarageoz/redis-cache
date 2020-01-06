const router = require('express').Router();
const blogRouter = require('./blog');
const authRouter = require('./auth');
const authorization = require('../middlewares/authorization');

router.use('/', authorization);
router.use('/auth', authRouter);
router.use('/blog', blogRouter);

router.get('/', (req, res) => {
    res.send('Hi <a href="/auth/logout">Logout</a>');
});


module.exports = router;