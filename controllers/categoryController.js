const Categroy = require('../models/categoryModel');
const asynchandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const handlerFactory = require('./handlerFactory');
const uploadImage = require('../middlewares/uploadImageMiddleware');

exports.uploadCategoryImage = uploadImage.uploadSingleImage('image');

exports.resizeCategoryImage = asynchandler(async (req, res, next) => {
  if (req.file) {
    const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
    console.log(req.file);
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${fileName}`);

    // save imageName to Database
    req.body.image = fileName;
  }
  next();
});

exports.getAllCategories = handlerFactory.getAll(Categroy);
exports.getCategory = handlerFactory.getOne(Categroy);
exports.createCategory = handlerFactory.createOne(Categroy);
exports.updateCategory = handlerFactory.updateOne(Categroy);
exports.daleteCategory = handlerFactory.deleteOne(Categroy);
