const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Categroy = require('../models/categoryModel');
const AppError = require('../utils/appError');

exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const countDocs = await Categroy.countDocuments();
  const apiFeatures = new ApiFeatures(Categroy.find(), req.query)
    .filter()
    .search('Category')
    .sort()
    .paginate(countDocs)
    .limitFields();

  const { query, paginationResault } = apiFeatures;
  const categories = await query;

  res.status(200).json({
    status: 'success',
    results: categories.length,
    paginationResault,
    data: {
      categories,
    },
  });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Categroy.findById(id);

  if (!category) {
    return next(new AppError('No category for this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const newCategroy = await Categroy.create({ name, slug: slugify(name) });
  res.status(201).json({
    status: 'success',
    data: newCategroy,
  });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const category = await Categroy.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!category) {
    return next(new AppError('No category for thdis id', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      data: category,
    },
  });
});

exports.daleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Categroy.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('No category for this id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
