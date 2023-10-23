const express = require('express');
const morgan = require('morgan');
const path = require('path');
const categoryRouter = require('./Routes/categoryRoutes');
const subCategoryRouter = require('./Routes/subCategoryRoutes');
const brandsRouter = require('./Routes/brandsRoutes');
const productRouter = require('./Routes/productRoutes');
const userRouter = require('./Routes/userRoutes');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subCategory', subCategoryRouter);
app.use('/api/v1/brand', brandsRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find this route: ${req.originalUrl}`, 400));
});

//Global error handling middleware
app.use(globalError);

module.exports = app;
