const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Coupon = require('../../models/couponModel');

exports.createCouponValidator = [
  check('name')
    .notEmpty()
    .withMessage('Coupon must have a name')
    .custom(async (val, { req }) => {
      const coupon = await Coupon.findOne({ name: val });

      if (coupon) {
        throw new Error('Coupon Already exist');
      }
    }),

  check('expireDate').notEmpty().withMessage('Coupon must have expire date'),

  check('discount').notEmpty().withMessage('Coupon must have a discount'),
  validatorMiddleware,
];
