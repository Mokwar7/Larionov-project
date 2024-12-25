const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  value: {
    type: String,
    minLength: 1,
    maxLength: 100,
    require: true,
  },
});

module.exports = mongoose.model('brand', brandSchema);
