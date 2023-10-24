const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../utils/validators/userValidator');
const authController = require('../controllers/authController');
const authValidator = require('../utils/validators/authValidator');

const router = express.Router();

router.post('/signup', authValidator.signUpValidator, authController.signUp);
router.post('/login', authValidator.loginValidator, authController.login);
router.post(
  '/forgotPassword',
  authValidator.forgotPasswordValidator,
  authController.forgotPassword,
);
router.post('/verifyResetCode', authController.verifyResetCode);
router.patch('/resetPassword', authController.resetPassword);
router.patch('/updateMe', userController.updateMe);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    userValidator.createUserValidator,
    userController.createUser,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userValidator.userIdValidator,
    userController.getUser,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userValidator.updateUserValidator,
    userController.updateUser,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userValidator.userIdValidator,
    userController.deleteUser,
  );

module.exports = router;
