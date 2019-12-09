const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
    {
      title: {type: String, required: true, max: 20},
      description: {type: String, required: false, max: 3000},
      rating: {type: Number, min: 0, max: 5},
    });
module.exports = mongoose.model('Rating', RatingSchema);
