const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    minLength: 5,
    maxLength: 1000,
    require: true,
  },
  good: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'good',
    require: true,
  },
  isMain: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model('image', imageSchema);
