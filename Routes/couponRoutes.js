const express = require('express');
const authController = require('../controllers/authController');
const couponController = require('../controllers/couponController');
const couponValidator = require('../utils/validators/couponValidator');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(couponController.getAllCoupons)
  .post(couponValidator.createCouponValidator, couponController.createCoupon);

router
  .route('/:id')
  .get(couponController.getCoupon)
  .patch(couponController.updateCoupon)
  .delete(couponController.deleteCoupon);

module.exports = router;
