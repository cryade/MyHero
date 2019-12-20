const Hero = require('../models/heroM');
const Rating = require('../models/RatingM');
const User = require('../models/userM');


exports.rateHero = function rateHero(req, res) {
  var myNewRating;
  // checks if the heroID is valid

  Hero.findById(req.params.heroID).exec((err, heroData) => {
    if (err) return res.status(500).send(err);
    if (heroData == null) {
      return res.status(400).json({
        message: 'no hero with that ID'
      });
    }
  });
  myNewRating = new Rating(
    {
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
      user: req.session.user.userId,
      hero: req.params.heroID

    // TODO id valiadation and name as parameter
    }
  );
  // save the rating
  myNewRating.save((err, ratingData) => {
    if (err) return res.status(500).send(err);
    // Create the reference in the user schema
    User.updateOne({ _id: req.session.user.userId }, { $push: { ratings: ratingData._id } }, (errT) => {
      if (errT) {
        return res.status(500).send(errT);
      }

      // create the reference in the hero schema
      Hero.updateOne({ _id: req.params.heroID }, { $push: { ratings: ratingData._id } }, (errD) => {
        if (errD) {
          res.status(500).send(errD);
        }
      });
    });
    return res.status(201).json({ message: 'Rating is stored' });
  });
};

// Deletes a rating. This action is triggered at the profile page from the user
exports.deleteRating = function deleteRating(req, res) {
  // Checks if the rating which should be deleted exists

  Rating.findOne({ _id: req.params.ratingID }).exec((err, rating) => {
    if (err) return res.status(500).send(err);
    if (rating == null) {
      res.status(400).send({
        message: 'No such rating'
      });
      return;
    }
    // The references are deleted automatically

    Rating.findOneAndDelete({ _id: req.params.ratingID }, (errT) => {
      if (errT) {
        return res.status(500).send(errT);
      }
      res.json({
        message: 'Rating deleted'
      });
    });
  });
};
