const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');
const authController = require('../controllers/authController');
const subcategoryValidator = require('../utils/validators/subCategoryValidators');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    subCategoryController.setCategoryIdToBody,
    subcategoryValidator.createSubCategoryValidator,
    subCategoryController.createSubCategory,
  )
  .get(subCategoryController.getSubCategories);

router
  .route('/:id')
  .get(
    subcategoryValidator.getsubCategoryValidator,
    subCategoryController.getSubCategory,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    subcategoryValidator.updateSubCategoryValidator,
    subCategoryController.updateSubCategory,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    subcategoryValidator.deleteSubCategoryValidator,
    subCategoryController.deleteSubCategory,
  );

module.exports = router;
