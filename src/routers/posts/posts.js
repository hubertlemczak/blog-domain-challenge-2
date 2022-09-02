const express = require('express');

const router = express.Router();
const commentsRouter = require('../comments');
const reactionsRouter = require('../reactions');

const controller = require('../../controllers/posts');

router.use('/:postId/comments', commentsRouter);

router.use('/:postId/reactions', reactionsRouter);

router.get('/', controller.getAllPosts);

module.exports = router;
