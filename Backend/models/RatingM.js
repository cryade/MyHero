const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
    {
    title: {type: String, required: true, max: 20},
     description: {type: String, required: false, max: 3000},
     rating: {type: Number, min: 0, max: 5, required: true},
     user: {type: Schema.Types.ObjectID, ref: 'User',required:true},
     hero: {type: Schema.Types.ObjectID, ref: 'Category',required:true}

    });
module.exports = mongoose.model('Rating', RatingSchema);
