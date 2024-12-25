const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 100,
    require: true,
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 100,
    require: true,
  },
  price: {
    type: Number,
    min: 1000,
    max: 1000000,
    default: 1000000,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    require: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand',
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('good', goodSchema);
