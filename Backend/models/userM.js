const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
let SALT = 10;

const UserSchema = new Schema(
    {
      username: {type: String, max: 20, required: true},
      firstName: { type: String, required: false},
      lastName: { type: String, required: false},
      birthdate: {type: Date, required: false},
      street: {type: String, required: false},
      housenumber: { type: Number,required: false},
      postalcode: { type: Number, minlength: 5, maxlength:5, required: false},
      city: {type: String, required: false},
      email: {type: String, required: true}, //TODO email vaildation
      password: { type: String, select: true, required: true },
      rating: [{type: Schema.Types.ObjectID, ref: 'Rating'}]
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

// UserSchema.path('email').validate(function (email) {
//   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//   return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.')
module.exports = mongoose.model('User', UserSchema);
