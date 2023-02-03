const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  personalId: {
    type: Number,
    trim: true,
  },
  contactNumber: {
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

module.exports = mongoose.model('clients', ClientSchema);
console.log('hola');