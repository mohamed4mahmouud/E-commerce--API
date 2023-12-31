const { Module } = require('module');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category must have a name'],
      unique: [true, 'Category must be unique'],
      minLength: [3, 'Too short category name'],
      maxLength: [32, 'Too long category name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true },
);

categorySchema.post('init', function (doc) {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
