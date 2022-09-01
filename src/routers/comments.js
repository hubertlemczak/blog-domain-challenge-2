const express = require('express');
const router = express.Router();

const controller = require('../controllers/comments');

router.get('/', controller.createComment);

module.exports = router;
