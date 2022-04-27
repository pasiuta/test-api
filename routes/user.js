const Router = require('express');
const router = new Router();
const userController = require('../controller/User');
const authController = require('../controller/Auth');

router.post('/login', authController.login);
router.post('/user', userController.createUser);
router.get('/user/:id', userController.getUser);
router.put('/user', userController.updateUser);


module.exports = router;