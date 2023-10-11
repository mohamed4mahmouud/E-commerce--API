const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Categroy = require('../models/categoryModel');

exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 2;
  const skip = (page - 1) * limit;
  const categories = await Categroy.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    results: categories.length,
    page,
    data: {
      categories,
    },
  });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Categroy.findById(id);

  if (!category) {
    res.status(404).json({ msg: 'No category for this id' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const newCategroy = await Categroy.create({ name, slug: slugify(name) });
  res.status(201).json({
    status: 'success',
    data: newCategroy,
  });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await Categroy.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name) },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    res.status(404).json({ msg: 'No category for this id' });
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
    res.status(404).json({ msg: 'No category for this id' });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
