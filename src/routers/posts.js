const express = require('express');

const router = express.Router();
const commentsRouter = require('./comments');

const controller = require('../controllers/posts');

router.use('/:postId/comments', commentsRouter);

router.get('/', controller.getAllPosts);

module.exports = router;
