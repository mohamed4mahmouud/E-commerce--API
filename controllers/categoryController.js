const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Categroy = require('../models/categoryModel');

exports.getCategory = async (req, res, next) => {};

exports.createCategory = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const newCategroy = await Categroy.create({ name, slug: slugify(name) });
  res.status(201).json({
    status: 'success',
    data: newCategroy,
  });
});
