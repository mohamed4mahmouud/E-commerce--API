const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../utils/validators/userValidator');
const authController = require('../controllers/authController');
const authValidator = require('../utils/validators/authValidator');

const router = express.Router();

router.post('/signup', authValidator.signUpValidator, authController.signUp);
router.post('/login', authValidator.loginValidator, authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/verifyResetCode', authController.verifyResetCode);
router.patch('/resetPassword', authController.resetPassword);

router.use(authController.protect);

router.patch(
  '/updateMe',
  userValidator.updateLoggedUserValidator,
  userController.updateMe,
);
router.get('/getMe', userController.getMe, userController.getUser);
router.delete('/deleteMe', userController.deleteMe);
router.patch(
  '/updatePassword',
  authValidator.updatePasswordValidator,
  authController.updatePassword,
);

router.use(authController.restrictTo('admin'));

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
