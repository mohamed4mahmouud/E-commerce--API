const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');
const AppError = require('../utils/appError');

exports.getSubCategories = asyncHandler(async (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const subCategories = await SubCategory.find(filterObject);

  res.status(200).json({
    status: 'success',
    result: subCategories.length,
    data: subCategories,
  });
});

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const newSubCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({
    status: 'success',
    data: newSubCategory,
  });
});

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);

  if (!subCategory) {
    return next(new AppError('No SubCategory for this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: subCategory,
  });
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    {
      new: true,
    },
  );

  if (!subCategory) {
    return next(new AppError('No SubCategory for this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: subCategory,
    },
  });
});

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);

  if (!subCategory) {
    return next(new AppError('No SubCategory for this id', 404));
  }

  res.status(204).json({
    data: null,
  });
});
