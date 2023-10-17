const Categroy = require('../models/categoryModel');
const handlerFactory = require('./handlerFactory');

exports.getAllCategories = handlerFactory.getAll(Categroy);
exports.getCategory = handlerFactory.getOne(Categroy);
exports.createCategory = handlerFactory.createOne(Categroy);
exports.updateCategory = handlerFactory.updateOne(Categroy);
exports.daleteCategory = handlerFactory.deleteOne(Categroy);
