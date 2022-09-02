const express = require('express');
const router = express.Router({ mergeParams: true });

const controller = require('../controllers/comments');

router.post('/', controller.createComment);

router.post('/:commentId', controller.createReplyComment);

router.put('/:commentId', controller.updateComment);

router.delete('/:commentId', controller.deleteComment);

module.exports = router;
