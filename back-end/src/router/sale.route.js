const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/sale.controller');
const CheckAuth = require('../middlewares/check-auth');

router.get('/', CheckAuth, SaleController.show);
router.post('/',CheckAuth, SaleController.create);
router.put('/', CheckAuth, SaleController.update);
router.delete('/:saleId',CheckAuth, SaleController.delete);
router.get('/:saleId',CheckAuth, SaleController.findOne);

module.exports = router;