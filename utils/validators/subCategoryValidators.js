const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');

exports.getsubCategoryValidator = [
  check('id').isMongoId().withMessage('invalid subcategory id format'),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('subCategory must have a name')
    .isLength({ min: 2 })
    .withMessage('Too short subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long subcategory name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('category')
    .notEmpty()
    .withMessage('SubCategory must be belong to category')
    .isMongoId()
    .withMessage('invalid category id format'),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('invalid subcategory id format'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('invalid subcategory id format'),
  validatorMiddleware,
];
