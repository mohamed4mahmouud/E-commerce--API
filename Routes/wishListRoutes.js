const express = require('express');
const wishListController = require('../controllers/wishlistController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    wishListController.addProductToWishList,
  )
  .get(
    authController.protect,
    authController.restrictTo('user'),
    wishListController.getLoggedUserWishList,
  );

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('user'),
  wishListController.removeProductFromWishList,
);

module.exports = router;
