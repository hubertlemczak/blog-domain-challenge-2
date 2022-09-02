const express = require('express');
const router = express.Router({ mergeParams: true });

const controller = require('../controllers/reactions');

router.post('/', controller.createReaction);

router.delete('/:reactionId', controller.deleteReaction);

module.exports = router;
