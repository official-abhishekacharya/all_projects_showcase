//Adding products.json dynamically (ie automatically) to the Database

require('dotenv').config(); //importing config file

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); //Remove previosly added products
    await Product.create(jsonProducts); //add all the products from jsonProducts file
    console.log('SUCCESS!!!');
    process.exit(0); //exiting the event loop, 0 determines that everything went well
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
