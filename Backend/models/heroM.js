const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeroSchema = new Schema(
    {
      name: {type: String, required: true, max: 20},
      description: {type: String, required: false, max: 3000},
      category: [{type: Schema.Types.ObjectID, ref: 'Category',required:true}],
    });
module.exports = mongoose.model('Hero', HeroSchema);
