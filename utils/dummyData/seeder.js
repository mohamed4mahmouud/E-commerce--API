const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('../../models/productModel');

dotenv.config({ path: '../../config.env' });

// connect to DB
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log('DB connection Successful!');
});

// Read data
const products = JSON.parse(fs.readFileSync('./products.json'));

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
