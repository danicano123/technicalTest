const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductsSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: String,
    trim: true,
  },
  modifiedAt: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('products', ProductsSchema);
