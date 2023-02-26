//controllers for routes

const Product = require('../models/product');

//Test path
const getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('name')
    .select('name price')
    .limit(10)
    .skip(5);

  res.status(200).json({ products, nbHits: products.length });
};

//Actual path
const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query; // req.query gives an object of all th query elements
  const queryObject = {};

  //checking only for few properties
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  //logic for Numberic Filters
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(numericFilters, '----', filters);

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    console.log(queryObject);
  }

  let result = Product.find(queryObject); //finding request query, request query is in link like: http://..<url>..?name="john"&featured=true

  //// checking for sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    // console.log(sortList);
    result = result.sort(sortList);
  } else {
    ////default sort
    result = result.sort('createdAt');
  }

  //// checking for fields ie what to select
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    // console.log(fields);
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1; //user passed page
  const limit = Number(req.query.limit) || 10; //show only 10  queries on each page
  const skip = (page - 1) * limit; //pagination

  ////awaiting entire result
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
