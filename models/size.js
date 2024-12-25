const mongoose = require('mongoose');

const sizechema = new mongoose.Schema({
  value: {
    type: Number,
    min: 10,
    max: 60,
    require: true,
  },
  good: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'good',
    require: true,
  },
});

module.exports = mongoose.model('size', sizechema);
