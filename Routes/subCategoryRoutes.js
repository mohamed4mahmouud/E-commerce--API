const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');
const subcategoryValidator = require('../utils/validators/subCategoryValidators');

const router = express.Router();

router
  .route('/')
  .post(
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
    subcategoryValidator.updateSubCategoryValidator,
    subCategoryController.updateSubCategory,
  )
  .delete(
    subcategoryValidator.deleteSubCategoryValidator,
    subCategoryController.deleteSubCategory,
  );

module.exports = router;
