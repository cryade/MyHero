const User = require('../models/userM');

exports.create_user = function(req, res) {
  var myNewUser = new User(
    {
      "name": req.body.name,
      //TODO id valiadation and name as parameter
    },
);
myNewUser.save(function(err) {
  if (err) return res.send(err);
  
  res.send(myNewUser);

});
};

exports.edit_user = function(req, res) {
  User.findByIdAndUpdate(req.params.ID,req.body, function(err, result){
    if(err){
        console.log(err);
    }
    res.send(result);
  })
};

exports.delete_user = function(req, res) {
  User.findOneAndDelete({_id: req.params.ID},function (err, userData) {
    if (err) return res.send(err);
    res.send("User"+userData+" deleted");
  })
};
exports.show_user = function(req, res) {
  User.findOne({_id: req.params.ID}).exec(function (err, userData) {
    if (err) return res.send(err);
    res.send(userData);
  })
};

exports.delete_rating_userprofile = function(req, res) {
  res.send('Deleting a rating is not implemented yet');
};

//TODO only for dev
exports.user_list = function(req, res) {
   User.find().exec(function (err, userData) {
     if (err) return res.send(err);
     res.send(userData);
   })
 };
