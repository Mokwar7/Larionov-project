const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  good: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'good',
    require: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    require: true,
  },
  comment: {
    type: String,
    minLength: 0,
    maxLength: 500,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('review', reviewSchema);
