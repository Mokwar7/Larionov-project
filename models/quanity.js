const mongoose = require('mongoose');

const quanityShema = new mongoose.Schema({
  quanity: {
    type: Number,
    min: 0,
    max: 10000,
    require: true,
  },
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
});

module.exports = mongoose.model('quanity', quanityShema);
