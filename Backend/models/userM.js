const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
let SALT = 10;

const UserSchema = new Schema(
    {
      username: {type: String, max: 20},
      password: { type: String, select: true, required: true },
      firstName: { type: String },
      lastName: { type: String},
      birthdate: {type: Date, required: false},
      street: {type: String, },
      housenumber: { type: Number,required: false},
      postalcode: { type: Number, length: 5, required: false},
      city: {type: String, required: false},
      email: {type: String, required: true}, //TODO email vaildation
      rating: [{type: Schema.Types.ObjectID, ref: 'Rating'}],
    });

UserSchema.pre('save',function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(SALT,function(err,salt){
      if(err) return next(err);
      bcrypt.hash(user.password,salt,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})

UserSchema.methods.comparePassword = function(candiatePassword, checkPassword){
  console.log(this.password);
  console.log(candiatePassword);
  bcrypt.compare(candiatePassword,this.password,function(err,isMatch){
    if(err) return checkPassword(err)
    checkPassword(null, isMatch);
  })
}
module.exports = mongoose.model('User', UserSchema);
