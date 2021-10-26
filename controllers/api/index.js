const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./blogpost-routes');
// const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('/blogpost', postRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;
