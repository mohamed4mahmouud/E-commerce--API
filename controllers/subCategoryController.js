const SubCategory = require('../models/subCategoryModel');
const handlerFactory = require('./handlerFactory');

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.getSubCategories = handlerFactory.getAll(SubCategory);
exports.getSubCategory = handlerFactory.getOne(SubCategory);
exports.createSubCategory = handlerFactory.createOne(SubCategory);
exports.updateSubCategory = handlerFactory.updateOne(SubCategory);
exports.deleteSubCategory = handlerFactory.deleteOne(SubCategory);
