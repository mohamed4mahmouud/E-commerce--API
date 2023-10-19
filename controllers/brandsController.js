const Brand = require('../models/brandsModel');
const asynchandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const handlerFactory = require('./handlerFactory');
const uploadImage = require('../middlewares/uploadImageMiddleware');

exports.uploadBrandImage = uploadImage.uploadSingleImage('image');

exports.resizeBrandImage = asynchandler(async (req, res, next) => {
  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/Brands/${fileName}`);

  req.body.image = fileName;
  next();
});

exports.getAllBrands = handlerFactory.getAll(Brand);
exports.getBrand = handlerFactory.getOne(Brand);
exports.createBrand = handlerFactory.createOne(Brand);
exports.updateBrand = handlerFactory.updateOne(Brand);
exports.deleteBrand = handlerFactory.deleteOne(Brand);
