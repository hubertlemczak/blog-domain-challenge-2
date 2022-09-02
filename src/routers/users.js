const express = require('express');

const router = express.Router();
const userPostsRouter = require('./posts/userPosts');

const controller = require('../controllers/users');

router.use('/:userId/posts', userPostsRouter);

router.post('/', controller.createUser);

router.put('/:userId', controller.updateUser);

router.delete('/:userId', controller.deleteUser);

module.exports = router;
