const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
      name: {type: String, required: true, max: 20},
    });
module.exports = mongoose.model('Category', CategorySchema);
