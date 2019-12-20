const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String, required: true, max: 20, unique: true
    }
  }
);
module.exports = mongoose.model('Category', CategorySchema);
