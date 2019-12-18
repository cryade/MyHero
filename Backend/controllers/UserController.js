const User = require('../models/userM');
const Rating = require('../models/RatingM');

const sessionizeUser = user => {
   return { userId: user._id, username: user.username };

}
exports.create_user = function(req, res) {
  User.findOne({username: req.body.username}).exec(function (err, userData) {
    if (err) return res.send(err);
    if(!userData){
      console.log("hi");
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
myNewUser.save(function(err, userData) {
  if (err) return res.status(400).send(err);
  req.session.user = sessionizeUser(userData);
  res.send(myNewUser);

});
}else{
  res.status(400).send("Username already taken");
} 
})};


exports.edit_user = async function(req, res) {
  console.log(req.session.user.userId);
  console.log(req.body);
  await User.findOneAndUpdate({_id:req.session.user.userId}, req.body,{new:true},function(err, result){
    if(err){
        res.status(400).send(err);
      
    }
    });
     User.findById(req.session.user.userId, function(err,result){
      if(err){
        console.log(err);
     }
     console.log(result);
     res.send(result);
    }).select("-password");
};

exports.delete_user = function(req, res) {
  User.findOneAndDelete({_id: req.session.user.userId},function (err, userData) {
    if (err) return res.send(err);
    res.send("User"+userData+" deleted");
  })
};


exports.signin_user = function(req, res) {
  User.findOne({username: req.body.username}).exec(function (err, userData) {
    if (err) return res.send(err);
    if(!userData) {res.status(400).send("Login failed, user not found") }else{
    userData.comparePassword(req.body.password,function(err, isMatch){
      if(err) throw(err);
      if(!isMatch) return res.status(400).json({
        message: "Wrong Password"
      });
      req.session.user = sessionizeUser(userData);  
      res.status(200).send(req.session)
    })
   }
  })
};

exports.current_user = function(req, res){
    User.findById(req.session.user.userId).populate('ratings', '-user').populate('bookedHeroes').select('-password').exec(function (err, userData) {
      if (err) return res.send(err);
      console.log("You're logged in:",userData);
      res.send(userData);
    });
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

 exports.book_hero = function(req,res) {

   User.findByIdAndUpdate(req.session.user.userId,{$push: {bookedHeroes: req.params.HeroID}}, function(err){
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send("Hero booked");
  });
 }
