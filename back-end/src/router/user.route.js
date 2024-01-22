const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', UserController.show);
router.post('/', UserController.create);
router.put('/', UserController.update);
router.delete('/:userId',UserController.delete);
router.get('/:userId',UserController.findOne);
router.post('/login', UserController.login);
module.exports = router;