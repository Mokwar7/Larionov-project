const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  good: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'good',
    require: true,
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'size',
    require: true,
  },
  price: {
    type: Number,
    min: 0,
    max: 1000000,
    require: true,
  },
  adress: {
    type: String,
    minLength: 5,
    maxLength: 500,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('order', orderSchema);
