const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Brand = require('../models/brandsModel');
const AppError = require('../utils/appError');

exports.getAllBrands = asyncHandler(async (req, res, next) => {
  const brands = await Brand.find({});

  res.status(200).json({
    status: 'success',
    results: brands.length,
    data: {
      data: {
        brands,
      },
    },
  });
});

exports.createBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const newBrand = await Brand.create({ name, slug: slugify(name) });

  res.status(201).json({
    status: 'success',
    data: newBrand,
  });
});

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);

  if (!brand) {
    return next(new AppError('No brand for this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: brand,
  });
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true },
  );

  if (!brand) {
    return next(new AppError('No brand for this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: brand,
  });
});

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return next(new AppError('No id for this brand', 404));
  }

  res.status(204).json({
    data: null,
  });
});
