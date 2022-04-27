const Router = require('express');
const router = new Router();
const userController = require('../controller/user');
const authController = require('../controller/auth');

router.post('/login', authController.login);
router.post('/user', userController.createUser);
router.get('/user/:id', userController.getUser);
router.put('/user', userController.updateUser);


module.exports = router;