const express = require('express');
const categoryController = require('../controllers/categoryController');
const categoryValidator = require('../utils/validators/categoryValidators');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    categoryValidator.createCategoryValidator,
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(categoryValidator.getCategoryValidator, categoryController.getCategory)
  .patch(
    categoryValidator.updateCategoryValidator,
    categoryController.updateCategory
  )
  .delete(
    categoryValidator.deleteCategoryValidator,
    categoryController.daleteCategory
  );

module.exports = router;
