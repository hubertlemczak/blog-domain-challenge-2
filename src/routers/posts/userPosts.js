const express = require('express');

const router = express.Router({ mergeParams: true });

const controller = require('../../controllers/posts');

router.get('/', controller.getUserPosts);

router.post('/', controller.createPost);

router.put('/:postId', controller.updatePost);

router.delete('/:postId', controller.deletePost);

module.exports = router;
