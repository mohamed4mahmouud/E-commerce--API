const express = require('express');
const morgan = require('morgan');
const path = require('path');
const categoryRouter = require('./Routes/categoryRoutes');
const subCategoryRouter = require('./Routes/subCategoryRoutes');
const brandsRouter = require('./Routes/brandsRoutes');
const productRouter = require('./Routes/productRoutes');
const userRouter = require('./Routes/userRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const wishListRouter = require('./Routes/wishListRoutes');
const addressRouter = require('./Routes/addressRoutes');
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
app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/wishlist', wishListRouter);
app.use('/api/v1/address', addressRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find this route: ${req.originalUrl}`, 400));
});

//Global error handling middleware
app.use(globalError);

module.exports = app;
