const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.get('/', ProductController.show);
router.post('/', ProductController.create);
router.put('/', ProductController.update);
router.delete('/:productId',ProductController.delete);
router.get('/:productId',ProductController.findOne);

module.exports = router;