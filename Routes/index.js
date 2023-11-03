const categoryRouter = require('./categoryRoutes');
const subCategoryRouter = require('./subCategoryRoutes');
const brandsRouter = require('./brandsRoutes');
const productRouter = require('./productRoutes');
const userRouter = require('./userRoutes');
const reviewRouter = require('./reviewRoutes');
const wishListRouter = require('./wishListRoutes');
const addressRouter = require('./addressRoutes');
const couponRouter = require('./couponRoutes');

const mountRoutes = (app) => {
  app.use('/api/v1/categories', categoryRouter);
  app.use('/api/v1/subCategory', subCategoryRouter);
  app.use('/api/v1/brands', brandsRouter);
  app.use('/api/v1/products', productRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/reviews', reviewRouter);
  app.use('/api/v1/wishlist', wishListRouter);
  app.use('/api/v1/address', addressRouter);
  app.use('/api/v1/coupons', couponRouter);
};

module.exports = mountRoutes;
