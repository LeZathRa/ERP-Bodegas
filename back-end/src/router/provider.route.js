const express = require('express');
const router = express.Router();
const ProviderController = require('../controllers/provider.controller');
const CheckAuth = require('../middlewares/check-auth');

router.get('/', CheckAuth, ProviderController.show);
router.post('/', CheckAuth, ProviderController.create);
router.put('/', CheckAuth, ProviderController.update);
router.delete('/:providerId', CheckAuth, ProviderController.delete);
router.get('/:providerId', CheckAuth, ProviderController.findOne);

module.exports = router;