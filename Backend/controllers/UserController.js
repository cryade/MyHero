const User = require('../models/userM');
const Rating = require('../models/RatingM');

//the function sessionize User saves the ObjectID and the username in one variable so it can be used for the session
const sessionizeUser = user => {
  return { userId: user._id, username: user.username };

}

//The function creat_user creates users with the information which are given in the req.body. 
//Before a user gets created the function checks if the username is already taken, if so the message is delivered to the client
exports.create_user = function (req, res) {
  //Check if exsisting
  User.findOne({ username: req.body.username }).exec(function (err, userData) {
    if (err) return res.status(500).send(err);
    if (!userData) {
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
      myNewUser.save(function (err, userData) {
        if (err) return res.status(500).send(err);
        req.session.user = sessionizeUser(userData);
        res.status(201).send(myNewUser);
      });
    } else {
      res.status(400).json({
        message: "Username already taken"
      });
    }
  })
};

//The function edit_user edits usersdata. The new data is given in req.body and only the fields which are stated there get a update.
exports.edit_user = async function (req, res) {
  await User.findOneAndUpdate({ _id: req.session.user.userId }, req.body, [{ new: true }, omitundefined = false], (err, doc) => {
    if (err) {
      res.status(500).send(err);

    }
    console.log(doc);
    res.status(200).send(doc);
  });
};

// The function delete_user deletes the user who is currently stored in the session. Moreover the session and the cookies are deleted which means that the user is logged out
exports.delete_user = function (req, res) {
  User.findOneAndDelete({ _id: req.session.user.userId }, function (err, userData) {
    if (err) return res.status(500).send(err);
    req.session.destroy();
    res.clearCookie('user_sid');
    res.json({
      message: "User" + userData + " deleted"
    });
  })
};

// the function signin_user signs a user in. The password and username are given in the req.body and are compared to the stored data. only if they fit the user gets logged in
exports.signin_user = function (req, res) {
  //search for user with fitting name
  User.findOne({ username: req.body.username }).exec(function (err, userData) {
    if (err) return res.status(500).send(err);
    if (!userData) {
      res.status(400).json({
        message: "Login failed, user not found"
      })
    } else {
      //Compare the password
      userData.comparePassword(req.body.password, function (err, isMatch) {
        if (err) throw (err);
        if (!isMatch) return res.json({
          message: "Wrong Password"
        });
        //Set the session so the user stays logged in
        req.session.user = sessionizeUser(userData);
        res.status(200).send(req.session.user)
      })
    }
  })
};

//Returns the user who is currently logged in. The populate functions fill the references 
//from the Schema with the actual objects and the select defines that the password isn't send
exports.current_user = function (req, res) {
  User.findById(req.session.user.userId).populate('ratings', '-user').populate('bookedHeroes').select('-password').exec(function (err, userData) {
    if (err) return res.statu(500).send(err);
    console.log("You're logged in:", userData);
    res.status(200).send(userData);
  });
}

//Deletes a rating. This action is triggered at the profile page from the user
exports.delete_rating_userprofile = function (req, res) {
  //Checks if the rating which should be deleted exists

  Rating.findOne({ _id: req.params.RatingID }).exec(function (err, rating) {
    if (err) return res.status(500).send(err);
    if (rating == null) {
      res.status(400).send({
        message: "No such rating"
      })
      return;
    }
    //The references are deleted automatically

    Rating.findOneAndDelete({ _id: req.params.RatingID }, function (err) {
      if (err) {
        return res.status(500).send(err)
      } else {
        res.json({
          message: "Rating deleted"
        });
      }
    })
  });
};

// only for dev
// shows all users stored in the database
exports.user_list = function (req, res) {
  User.find().exec(function (err, userData) {
    if (err) return res.send(err);
    res.send(userData);
  })
};


//Makes a reference in the user schema to a hero. This reference is the symbol that the hero was booked by the user 
exports.book_hero = function (req, res) {

  User.findByIdAndUpdate(req.session.user.userId, { $push: { bookedHeroes: req.params.HeroID } }, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).json({
      message: "Hero" + req.params.HeroID + " booked"

    });
    return;
  });
}
