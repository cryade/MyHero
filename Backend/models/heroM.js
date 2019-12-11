const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeroSchema = new Schema(
    {
      name: {type: String, required: true, max: 20},
      description: {type: String, required: false, max: 3000},
      category: [{type: Schema.Types.ObjectID, ref: 'Category',required:true}],
      rating: [{type: Schema.Types.ObjectID, ref: 'Rating'}],
    });
module.exports = mongoose.model('Hero', HeroSchema);
