const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const reviewValidator = require('../utils/validators/reviewValidator');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.createFilter, reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setProductIdAndUserToBody,
    reviewValidator.createReviewValidator,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewValidator.getReviewValidator, reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    reviewValidator.updateReviewValidator,
    reviewController.updateReview,
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    reviewValidator.deleteReviewValidator,
    reviewController.deleteReview,
  );

module.exports = router;
