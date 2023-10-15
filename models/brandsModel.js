const mongoose = require('mongoose');

const brandsScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand must have a name'],
      unique: [true, 'Brand must be unique'],
      minLength: [3, 'Too short brand name'],
      maxLength: [32, 'Too long brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true },
);

const Brands = mongoose.model('Brands', brandsScehma);

module.exports = Brands;
