const express = require('express');
const addressController = require('../controllers/addressController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    addressController.addAddress,
  )
  .get(
    authController.protect,
    authController.restrictTo('user'),
    addressController.getAddress,
  );

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('user'),
  addressController.deleteAddress,
);

module.exports = router;
