const express = require('express');
const morgan = require('morgan');
const path = require('path');
const categoryRouter = require('./Routes/categoryRoutes');

const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/categories', categoryRouter);

module.exports = app;
