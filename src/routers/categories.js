const express = require('express');
const router = express.Router();

const controller = require('../controllers/categories');

router.get('/', controller.getAllCategories);

router.post('/', controller.createCategory);

router.put('/:categoryId', controller.updateCategory);

router.delete('/:categoryId', controller.deleteCategory);

module.exports = router;
