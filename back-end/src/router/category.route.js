const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router.get('/', CategoryController.show);
router.post('/', CategoryController.create);
router.put('/', CategoryController.update);
router.delete('/:categoryId',CategoryController.delete);
router.get('/:categoryId',CategoryController.findOne);

module.exports = router;