const express = require('express');
const brandsController = require('../controllers/brandsController');
const brandValidator = require('../utils/validators/brandValidator');

const router = express.Router();

router
  .route('/')
  .get(brandsController.getAllBrands)
  .post(
    brandsController.uploadBrandImage,
    brandsController.resizeBrandImage,
    brandValidator.createBrandValidator,
    brandsController.createBrand,
  );

router
  .route('/:id')
  .get(brandValidator.getBrandValidator, brandsController.getBrand)
  .patch(
    brandsController.uploadBrandImage,
    brandsController.resizeBrandImage,
    brandValidator.updateBrandValidator,
    brandsController.updateBrand,
  )
  .delete(brandValidator.deleteBrandValidator, brandsController.deleteBrand);

module.exports = router;
