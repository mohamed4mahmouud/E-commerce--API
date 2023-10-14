const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'Subcategory must be unique'],
      minLength: [2, 'Too short SubCategory name'],
      maxLength: [32, 'Too long SubCategory name'],
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must be belong to parent category'],
    },
  },
  { timestamps: true },
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
