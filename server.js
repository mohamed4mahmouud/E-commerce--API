const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// Connect with database
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log('DB connection Successful!');
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
