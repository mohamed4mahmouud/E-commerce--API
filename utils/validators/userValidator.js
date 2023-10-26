const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.createUserValidator = [
  check('name').notEmpty().withMessage('User must have a name'),

  check('email')
    .notEmpty()
    .withMessage('User must have a email')
    .isEmail()
    .withMessage('Invalid email address')
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

  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA', 'en-US'])
    .withMessage('Invalid phone number'),

  check('photo').optional(),

  check('role').optional(),

  validatorMiddleware,
];

exports.userIdValidator = [
  check('id').isMongoId().withMessage('Invalid id'),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid id'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address')
    .custom(
      asyncHandler(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    ),

  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA', 'en-US'])
    .withMessage('Invalid phone number'),

  check('photo').optional(),

  check('role').optional(),

  validatorMiddleware,
];

exports.updateLoggedUserValidator = [
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address')
    .custom(
      asyncHandler(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    ),

  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA', 'en-US'])
    .withMessage('Invalid phone number'),

  check('photo').optional(),
  validatorMiddleware,
];
