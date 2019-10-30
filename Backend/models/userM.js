var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required: true, max: 20},
    });
module.exports = mongoose.model('User', UserSchema);
