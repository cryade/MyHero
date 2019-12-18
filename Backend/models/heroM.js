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


    HeroSchema.pre('save',function(next){
      var hero = this;
      if(hero.isModified('password')){
        bcrypt.genSalt(SALT,function(err,salt){
          if(err) return next(err);
          bcrypt.hash(hero.password,salt,function(err,hash){
            if(err) return next(err);
            hero.password = hash;
            next();
          })
        })
      } else {
        next();
      }
    })
    
HeroSchema.methods.comparePassword = function(candiatePassword, checkPassword){
      console.log(this.password);
      console.log(candiatePassword);
      bcrypt.compare(candiatePassword,this.password,function(err,isMatch){
        if(err) return checkPassword(err)
        checkPassword(null, isMatch);
      })
    }
module.exports = mongoose.model('Hero', HeroSchema);
