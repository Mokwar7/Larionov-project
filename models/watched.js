const mongoose = require('mongoose');

const watchedSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('watched', watchedSchema);
