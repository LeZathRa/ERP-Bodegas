const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const user = require('../models/user');

router.get('/', UserController.show);
router.post('/', UserController.create);
router.put('/', UserController.update);
router.delete('/:userId',UserController.delete);

router.get('/:userId',UserController.findOne);




module.exports = router;