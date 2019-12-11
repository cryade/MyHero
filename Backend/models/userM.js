const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      name: {type: String, max: 20},
      rating: [{type: Schema.Types.ObjectID, ref: 'Rating'}],
    });
module.exports = mongoose.model('User', UserSchema);
