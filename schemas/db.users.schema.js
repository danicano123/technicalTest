const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  idCard: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  money: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('users', usersSchema);
