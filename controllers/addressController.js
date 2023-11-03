const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

exports.addAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data: user.addresses,
  });
});

exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    {
      $pull: { addresses: { _id: req.params.id } },
    },
    { new: true },
  );

  res.status(200).json({
    data: user.addresses,
  });
});

exports.getAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id).populate('addresses');

  res.status(200).json({
    status: 'success',
    data: user.addresses,
  });
});
