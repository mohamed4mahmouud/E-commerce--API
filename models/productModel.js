const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product must have a title'],
      trim: true,
      minLength: [3, 'Too short product title'],
      maxLength: [100, 'Too long product title'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product must have description'],
      minLength: [20, 'Too short product description'],
      maxLength: [2000, 'Too long product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
    },
    priceDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, 'Product image cover is required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must be belong to category'],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1'],
      max: [5, 'Rating must be below or equal 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre(/^find/, function (next) {
  this.populate({ path: 'category', select: 'name -_id' });
  next();
});

productSchema.post('init', function (doc) {
  if (doc.images) {
    const images = [];
    doc.images.forEach((img) => {
      const imageUrl = `${process.env.BASE_URL}/products/${img}`;
      images.push(imageUrl);
    });
    doc.images = images;
  }
  if (doc.imageCover) {
    const coverUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = coverUrl;
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
