const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeroSchema = new Schema(
    {
      heroname: {type: String, required: true, max: 20},
      email: { type: String, required: true},
      location: {type: String, required: false, max: 30},
      description: {type: String, required: false, max: 3000},
      category: [{type: Schema.Types.ObjectID, ref: 'Category'}],
      ratings: [{type: Schema.Types.ObjectID, ref: 'Rating'}],
    });

module.exports = mongoose.model('Hero', HeroSchema);
