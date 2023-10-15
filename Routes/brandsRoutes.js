const express = require('express');
const brandsController = require('../controllers/brandsController');
const brandValidator = require('../utils/validators/brandValidator');

const router = express.Router();

router
  .route('/')
  .get(brandsController.getAllBrands)
  .post(brandValidator.createBrandValidator, brandsController.createBrand);

router
  .route('/:id')
  .get(brandValidator.getBrandValidator, brandsController.getBrand)
  .patch(brandValidator.updateBrandValidator, brandsController.updateBrand)
  .delete(brandValidator.deleteBrandValidator, brandsController.deleteBrand);

module.exports = router;
