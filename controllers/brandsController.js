const Brand = require('../models/brandsModel');
const handlerFactory = require('./handlerFactory');

exports.getAllBrands = handlerFactory.getAll(Brand);
exports.getBrand = handlerFactory.getOne(Brand);
exports.createBrand = handlerFactory.createOne(Brand);
exports.updateBrand = handlerFactory.updateOne(Brand);
exports.deleteBrand = handlerFactory.deleteOne(Brand);
