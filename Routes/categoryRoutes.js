const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');
const categoryValidator = require('../utils/validators/categoryValidators');
const subCategoryRouter = require('./subCategoryRoutes');

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRouter);

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.uploadCategoryImage,
    categoryController.resizeCategoryImage,
    categoryValidator.createCategoryValidator,
    categoryController.createCategory,
  );

router
  .route('/:id')
  .get(categoryValidator.getCategoryValidator, categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.uploadCategoryImage,
    categoryController.resizeCategoryImage,
    categoryValidator.updateCategoryValidator,
    categoryController.updateCategory,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    categoryValidator.deleteCategoryValidator,
    categoryController.daleteCategory,
  );

module.exports = router;
