const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.signUpValidator = [
  check('name').notEmpty().withMessage('User must have a name'),

  check('email')
    .notEmpty()
    .withMessage('User must have a email')
    .isEmail()
    .withMessage('Invalid Email')
    .custom(
      asyncHandler(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    ),

  check('password')
    .notEmpty()
    .withMessage('User must have a password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((pass, { req }) => {
      if (pass !== req.body.passwordConfirm) {
        throw new Error('Passwords are not the same');
      }
      return true;
    }),

  check('passwordConfirm')
    .notEmpty()
    .withMessage('Please confirm your password'),

  validatorMiddleware,
];

exports.loginValidator = [
  check('email').notEmpty().withMessage('Please Enter your email').isEmail(),
  check('password')
    .notEmpty()
    .withMessage('User must have a password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];