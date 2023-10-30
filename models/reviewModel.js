const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    rating: {
      type: Number,
      min: [1, 'Min ratings value is 1.0'],
      max: [5, 'Max ratings value is 5.0'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to user'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to product'],
    },
  },
  { timestamps: true },
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name photo -_id' });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
