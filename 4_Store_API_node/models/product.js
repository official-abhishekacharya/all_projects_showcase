//setting model for Database input

const mongoose = require('mongoose');

//Setting how input Json should look like
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided'], //array [true, 'error message']
  },

  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAT: {
    type: Date,
    default: Date.now(), //By default, current time
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'], //only from this array
      message: '{VALUE} is not supported', //{VALUE} is user i/p, custom error message
    },
  
  },
});

module.exports = mongoose.model('Product', productSchema);
