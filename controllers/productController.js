const Product = require('../models/productModel');
const handlerFactory = require('./handlerFactory');

exports.getAllProducts = handlerFactory.getAll(Product, 'Product');
exports.getProduct = handlerFactory.getOne(Product);
exports.createProduct = handlerFactory.createOne(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);
