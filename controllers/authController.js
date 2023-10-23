const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

const createToken = (data) =>
  jwt.sign({ id: data }, process.env.JWT_SECERT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.signUp = asyncHandler(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  //Generate token
  const token = createToken(newUser._id);

  res.status(201).json({
    status: 'success',
    data: newUser,
    token,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = createToken(user._id);

  res.status(200).json({
    status: 'success',
    data: user,
    token,
  });
});
