const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createProductValidator = [
  check('title')
    .notEmpty()
    .withMessage('Product must have a title')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 chars')
    .isLength({ max: 100 })
    .withMessage('Too long product title'),

  check('description')
    .notEmpty()
    .withMessage('Product must have description')
    .isLength({ min: 20 })
    .withMessage('Too short product description')
    .isLength({ max: 2000 })
    .withMessage('Too long product description'),

  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),

  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product quantity must be a number'),

  check('price').notEmpty().withMessage('Product price is required'),

  check('priceDiscount')
    .optional()
    .isNumeric()
    .withMessage('priceDiscount must be a number')
    .toFloat()
    .custom((val, { req }) => {
      if (req.body.price <= val) {
        throw new Error('priceDiscount must be lower than price');
      }
      return true;
    }),

  check('colors')
    .optional()
    .isArray()
    .withMessage('colors should be array of string'),

  check('imageCover').notEmpty().withMessage('Product image cover is required'),

  check('images')
    .optional()
    .isArray()
    .withMessage('Images should be array of string'),

  check('category')
    .notEmpty()
    .withMessage('Product must be belong to category')
    .isMongoId()
    .withMessage('Invalid id format'),

  check('subcategory').optional().isMongoId().withMessage('Invalid id format'),

  check('brand').optional().isMongoId().withMessage('Invalid id format'),

  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5'),

  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  validatorMiddleware,
];
