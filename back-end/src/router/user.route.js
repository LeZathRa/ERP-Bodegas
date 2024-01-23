const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const CheckAuth = require('../middlewares/check-auth');

router.get('/', CheckAuth, UserController.show);
router.post('/', CheckAuth, UserController.create);
router.put('/', CheckAuth, UserController.update);
router.delete('/:userId', CheckAuth,UserController.delete);
router.get('/:userId', CheckAuth, UserController.findOne);
router.post('/login', UserController.login);

module.exports = router;