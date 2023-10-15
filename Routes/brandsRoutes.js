const express = require('express');
const brandsController = require('../controllers/brandsController');

const router = express.Router();

router
  .route('/')
  .get(brandsController.getAllBrands)
  .post(brandsController.createBrand);

router
  .route('/:id')
  .get(brandsController.getBrand)
  .patch(brandsController.updateBrand)
  .delete(brandsController.deleteBrand);

module.exports = router;
