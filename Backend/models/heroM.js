const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeroSchema = new Schema(
    {
      name: {type: String, required: true, max: 20},
      //picture
      // avg rating
      email: { type: String, required: true},
      avgrating: {type: Number,required: false },
      location: {type: String, required: false, max: 30},
      description: {type: String, required: false, max: 3000},
      imgdata: {type: Buffer},
      imgContentType: { type : String},
      category: [{type: Schema.Types.ObjectID, ref: 'Category'}],
      rating: [{type: Schema.Types.ObjectID, ref: 'Rating'}],
    });
module.exports = mongoose.model('Hero', HeroSchema);
