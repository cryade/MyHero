const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const SALT = 10;

const UserSchema = new Schema(
  {
    username: { type: String, max: 20, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    birthdate: { type: Date, required: false },
    street: { type: String, required: false },
    housenumber: { type: Number, required: false },
    postalcode: {
      type: Number, minlength: 5, maxlength: 5, required: false
    },
    city: { type: String, required: false },
    email: { type: String, required: true }, // TODO email vaildation
    password: { type: String, select: true, required: true },
    ratings: [{ type: Schema.Types.ObjectID, ref: 'Rating' }],
    bookedHeroes: [{ type: Schema.Types.ObjectID, ref: 'Hero' }]
  }
);

UserSchema.pre('save', function save(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT, (errT, salt) => {
      if (errT) return next(errT);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
  else {
    next();
  }
});

UserSchema.methods.comparePassword = function comparePassword(candiatePassword, checkPassword) {
  console.log(this.password);
  console.log(candiatePassword);
  bcrypt.compare(candiatePassword, this.password, (err, isMatch) => {
    if (err) return checkPassword(err);
    checkPassword(null, isMatch);
  });
};

// UserSchema.path('email').validate(function (email) {
//   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//   return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.')
module.exports = mongoose.model('User', UserSchema);
