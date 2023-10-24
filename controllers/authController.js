const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/userModel');

const createToken = (data) =>
  jwt.sign({ id: data }, process.env.JWT_SECERT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

const hashedResetCode = (resetCode) =>
  crypto.createHash('sha256').update(resetCode).digest('hex');

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

exports.protect = asyncHandler(async (req, res, next) => {
  //check if token exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }
  //verfiy token
  const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY);

  //check if user exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist',
        401,
      ),
    );
  }

  //Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User Recently changed password', 401));
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not allowed to access this route', 403),
      );
    }
    next();
  });

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  //get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email', 404));
  }

  //generate random 6 digits
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashCode = hashedResetCode(resetCode);

  user.passwordResetCode = hashCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerifed = false;

  await user.save();

  //send reset code via email
  const message = `Hi ${user.name},\n we received a request to reset the password on your E-shop Account. \n ${resetCode}`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password reset code',
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerifed = undefined;
    await user.save();
    return next(new AppError('there is an error in sending email', 500));
  }
  res.status(200).json({ status: 'success' });
});

exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashCode = hashedResetCode(req.body.resetCode);

  const user = await User.findOne({
    passwordResetCode: hashCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Reset code Invalid or expired'));
  }
  user.passwordResetVerifed = true;
  await user.save();

  res.status(200).json({ status: 'success' });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('No users for this email', 404));
  }
  if (!user.passwordResetVerifed) {
    return next(new AppError('Reset code not verified', 400));
  }
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetVerifed = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  //generate token
  const token = createToken(user.id);
  res.status(200).json({ token });
});
