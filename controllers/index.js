const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const blogPage = require('./blogpage-routes.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blogpage', blogPage);

module.exports = router;
