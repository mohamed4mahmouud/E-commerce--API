const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const handlerFactory = require('./handlerFactory');
const uploadImage = require('../middlewares/uploadImageMiddleware');
const AppError = require('../utils/appError');

exports.uploadUserImage = uploadImage.uploadSingleImage('photo');

exports.resizaUserImage = asyncHandler(async (req, res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(400, 400)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/usres/${fileName}`);

    req.body.photo = fileName;
  }
  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates', 400));
  }
  const filteredBody = filterObj(req.body, 'name', 'email', 'phone');
  if (req.file) filteredBody.photo = req.body.photo;
  const updatedUser = await User.findByIdAndUpdate(req.param.id, filteredBody, {
    new: true,
  });
  if (!updatedUser) {
    return next(new AppError('No user for this id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});

exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
exports.createUser = handlerFactory.createOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
