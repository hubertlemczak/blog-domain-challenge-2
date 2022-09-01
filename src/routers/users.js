const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');

router.post('/', controller.createUser);

router.put('/:userId', controller.updateUser);

router.delete('/:userId', controller.deleteUser);

module.exports = router;
