const User = require('../models/userM');
const Rating = require('../models/RatingM');

const sessionizeUser = user => {
  return { userId: user._id, username: user.name };
}
exports.create_user = function(req, res) {
  var myNewUser = new User(
    {
      "username": req.body.username,
      "password": req.body.password,
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "birthdate": req.body.birthdate,
      "street": req.body.street,
      "housenumber": req.body.housenumber,
      "postalcode": req.body.postalcode,
      "city": req.body.city,
      "email": req.body.email,

      //TODO id valiadation and name as parameter
    },
);
myNewUser.save(function(err) {
  if (err) return res.send(err);
  
  res.send(myNewUser);

});
};

exports.edit_user = function(req, res) {
  User.findByIdAndUpdate(req.session.userId,req.body, function(err, result){
    if(err){
        console.log(err);
    }
    res.send(result);
  })
};

exports.delete_user = function(req, res) {
  User.findOneAndDelete({_id: req.session.userId},function (err, userData) {
    if (err) return res.send(err);
    res.send("User"+userData+" deleted");
  })
};


exports.signin_user = function(req, res) {
  User.findOne({name: req.body.username}).exec(function (err, userData) {
    if (err) return res.send(err);
    if(!userData) {res.send("Login faild, user not found") }else{
    userData.comparePassword(req.body.password,function(err, isMatch){
      if(err) throw(err);
      if(!isMatch) return res.status(400).json({
        message: "Wrong Password"
      });
      req.session.user = sessionizeUser(userData);
       
      console.log(req.session) 
      res.status(200).send('Logged in successfully')
    })
   }
  })
};
exports.signout = function(req,res){
  req.session.destroy();
  console.log(req.session);
  res.redirect('/');
}

exports.delete_rating_userprofile = function(req, res) {
  Rating.findOneAndDelete({_id: req.params.ID},function (err) {
    if (err) return res.send(err);
    res.send("Rating deleted");
  })
};

//TODO only for dev
exports.user_list = function(req, res) {
   User.find().exec(function (err, userData) {
     if (err) return res.send(err);
     res.send(userData);
   })
 };
