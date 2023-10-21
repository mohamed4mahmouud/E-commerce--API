const asynchandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/productModel');
const handlerFactory = require('./handlerFactory');
const uploadMixOfImages = require('../middlewares/uploadImageMiddleware');

exports.uploadProductImages = uploadMixOfImages.uploadMixOfImages([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeProductImages = asynchandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverName}`);

    req.body.imageCover = imageCoverName;
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (el) => {
        const fileName = `product-${uuidv4()}-${Date.now()}.jpeg`;

        await sharp(el.buffer)
          .resize(400, 400)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${fileName}`);

        req.body.images.push(fileName);
      }),
    );
    next();
  }
});

exports.getAllProducts = handlerFactory.getAll(Product, 'Product');
exports.getProduct = handlerFactory.getOne(Product);
exports.createProduct = handlerFactory.createOne(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);
