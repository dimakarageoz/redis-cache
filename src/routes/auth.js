const router = require('express').Router();
const controller = require('../controllers/auth');
const clearCache = require('../middlewares/clearCache');

router.get('/login', controller.loginPage);
router.post('/login', controller.login);

router.get('/signup', controller.signupPage);
router.post('/signup', controller.signup);

router.get('/logout', clearCache, controller.logout);

module.exports = router;