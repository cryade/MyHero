var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HeroSchema = new Schema(
    {
        name: {type: String, required: true, max: 20},
        description: {type: String, required: false, max: 3000},
        category: [{type: Schema.Types.ObjectID, ref: 'Category'}],
    });
module.exports = mongoose.model('Hero', HeroSchema);
