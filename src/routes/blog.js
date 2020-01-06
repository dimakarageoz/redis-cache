const router = require('express').Router();
const controller = require('../controllers/blog');
const clearCache = require('../middlewares/clearCache');

router.post('/', clearCache, controller.createBlog);

module.exports = router;

