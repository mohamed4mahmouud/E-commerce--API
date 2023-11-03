const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//Add product to wishList
exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    {
      $addToSet: { wishList: req.body.product },
    },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data: user.wishList,
  });
});

exports.removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    {
      $pull: { wishList: req.params.id },
    },
    {
      new: true,
    },
  );
  res.status(200).json({
    data: user.wishList,
  });
});

exports.getLoggedUserWishList = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id).populate('wishList');

  res.status(200).json({
    status: 'success',
    data: user.wishList,
  });
});
