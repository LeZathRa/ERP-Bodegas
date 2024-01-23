const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const CheckAuth = require('../middlewares/check-auth');


router.get('/', CheckAuth, ProductController.show);
router.post('/', CheckAuth,  ProductController.create);
router.put('/', CheckAuth,  ProductController.update);
router.delete('/:productId', CheckAuth, ProductController.delete);
router.get('/:productId', CheckAuth, ProductController.findOne);

module.exports = router;