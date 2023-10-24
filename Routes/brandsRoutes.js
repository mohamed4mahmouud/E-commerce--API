const express = require('express');
const brandsController = require('../controllers/brandsController');
const authController = require('../controllers/authController');
const brandValidator = require('../utils/validators/brandValidator');

const router = express.Router();

router
  .route('/')
  .get(brandsController.getAllBrands)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    brandsController.uploadBrandImage,
    brandsController.resizeBrandImage,
    brandValidator.createBrandValidator,
    brandsController.createBrand,
  );

router
  .route('/:id')
  .get(brandValidator.getBrandValidator, brandsController.getBrand)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    brandsController.uploadBrandImage,
    brandsController.resizeBrandImage,
    brandValidator.updateBrandValidator,
    brandsController.updateBrand,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    brandValidator.deleteBrandValidator,
    brandsController.deleteBrand,
  );

module.exports = router;
