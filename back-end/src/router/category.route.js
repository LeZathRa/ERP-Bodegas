const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const CheckAuth = require('../middlewares/check-auth');

router.get('/', CheckAuth,  CategoryController.show);
router.post('/', CheckAuth,  CategoryController.create);
router.put('/', CheckAuth,  CategoryController.update);
router.delete('/:categoryId', CheckAuth, CategoryController.delete);
router.get('/:categoryId', CheckAuth, CategoryController.findOne);

module.exports = router;