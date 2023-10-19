const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new AppError('No document for this id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new AppError('No document for this id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: document,
    });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const newDocument = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newDocument,
    });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(new AppError('No document for this id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: document,
    });
  });

exports.getAll = (Model, modelName = ' ') =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.params.categoryId) filter = { category: req.params.categoryId };
    const countDocs = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .search(modelName)
      .sort()
      .paginate(countDocs)
      .limitFields();

    const { query, paginationResault } = apiFeatures;
    const documents = await query;

    res.status(200).json({
      status: 'success',
      results: documents.length,
      paginationResault,
      data: {
        documents,
      },
    });
  });
