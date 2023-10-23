const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../utils/validators/userValidator');
const authController = require('../controllers/authController');
const authValidator = require('../utils/validators/authValidator');

const router = express.Router();

router.patch('/updateMe', userController.updateMe);
router.post('/signup', authValidator.signUpValidator, authController.signUp);
router.post('/login', authValidator.loginValidator, authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userValidator.createUserValidator, userController.createUser);

router
  .route('/:id')
  .get(userValidator.userIdValidator, userController.getUser)
  .patch(userValidator.updateUserValidator, userController.updateUser)
  .delete(userValidator.userIdValidator, userController.deleteUser);

module.exports = router;
