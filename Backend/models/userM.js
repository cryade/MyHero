const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      username: {type: String, required: true, max: 20},
    });
module.exports = mongoose.model('User', UserSchema);
