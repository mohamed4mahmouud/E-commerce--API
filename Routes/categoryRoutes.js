const express = require('express');
const categoryController = require('../controllers/categoryController');
const categoryValidator = require('../utils/validators/categoryValidators');
const subCategoryRouter = require('./subCategoryRoutes');

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRouter);

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    categoryController.uploadCategoryImage,
    categoryController.resizeCategoryImage,
    categoryValidator.createCategoryValidator,
    categoryController.createCategory,
  );

router
  .route('/:id')
  .get(categoryValidator.getCategoryValidator, categoryController.getCategory)
  .patch(
    categoryController.uploadCategoryImage,
    categoryController.resizeCategoryImage,
    categoryValidator.updateCategoryValidator,
    categoryController.updateCategory,
  )
  .delete(
    categoryValidator.deleteCategoryValidator,
    categoryController.daleteCategory,
  );

module.exports = router;
