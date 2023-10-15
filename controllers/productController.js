const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({
    status: 'success',
    data: {
      data: products,
    },
  });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError('No product for this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: product,
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!product) {
    return next(new AppError('No product for this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new AppError('No product for this id', 404));
  }

  res.status(204).json({
    data: null,
  });
});
