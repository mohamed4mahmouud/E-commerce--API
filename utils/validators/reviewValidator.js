const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Review = require('../../models/reviewModel');

exports.createReviewValidator = [
  check('title').optional(),
  check('rating')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating value must be betwwen 1 to 5'),

  check('user').isMongoId().withMessage('Invalid Id format'),

  check('product')
    .isMongoId()
    .withMessage('Invalid Id format')
    .custom(async (val, { req }) => {
      const review = await Review.findOne({
        user: req.user.id,
        product: req.body.product,
      });

      if (review) {
        throw new Error('You already created a review before');
      }
    }),
  validatorMiddleware,
];

exports.getReviewValidator = [
  check('id').isMongoId().withMessage('Invalid Id format'),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Id format')
    .custom(async (val, { req }) => {
      const review = await Review.findById(val);
      if (!review) {
        throw new Error('No review for this id');
      }
      if (review.user._id.toString() !== req.user.id.toString()) {
        throw new Error('You are not allowed to perform this action');
      }
    }),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Id format')
    .custom(async (val, { req }) => {
      if (req.user.role === 'user') {
        const review = await Review.findById(val);
        if (!review) {
          throw new Error('No review for this id');
        }
        if (review.user._id.toString() !== req.user.id.toString()) {
          throw new Error('You are not allowed to perform this action');
        }
      }
      return true;
    }),
  validatorMiddleware,
];
