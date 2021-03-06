const Hero = require('../models/heroM');


// GET list of all heroes
exports.heroList = function heroList(req, res) {
  // res.send('Display a list of all heroes is not implemented yet');
  Hero.find().populate({ path: 'category', select: 'name' }).exec((err, heroData) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(heroData);
  });
};

// GETS a list of all heros that have a fitting name.
exports.heroListByName = function heroListByName(req, res) {
  Hero.find({ heroname: { $regex: req.params.name } }).populate('category', 'name').exec((err, heroData) => {
    if (err) return res.status(500).send(err);
    // Checks if there is no hero and returns an error 400
    res.send(heroData);
  });
};

// GETS a list of all heros with the matching category
exports.heroListByCategory = function heroListByCategory(req, res) {
  Hero.find({ category: req.params.ID }).populate('category', 'name').exec((err, heroData) => {
    if (err) return res.status(500).send(err);
    // Checks if there is no hero and returns an error 400
    res.send(heroData);
  });
};

// GETs all the herodata including the rating data which is populated so it can be displayed properly
exports.heroGetByID = function heroGetByID(req, res) {
  Hero.findOne({ _id: req.params.ID }).populate('category', 'name').populate('rating', '-hero').exec((err, heroData) => {
    if (err) return res.status(500).send(err);
    if (heroData == null) {
      return res.status(200).json({
        message: 'No hero with that ID'
      });
    }
    return res.send(heroData);
  });
};

// exports.hero_upload_pic = function(req,res) {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
//   Hero.findByIdAndUpdate(req.params.ID,{ imgdata: req.files }, function(err, result){
//     if(err){
//         console.log(err);
//     }
//     res.status(200).send('File uploaded!');

//   })
// }


//   req.body.category.forEach( function(value,index){
//    return category.findOne({name: value}).then(function(searchResult) {
//        console.log(searchResult);
//       req.body.category[index] = searchResult._id;
//     }
//    )
//  }).then(function(heroResult) {
//  })

// Creates a new hero and saves it to the database
// !!!not implemented in the frontend due time reasons!!!
exports.createHero = function createHero(req, res) {
  var myNewHero = new Hero(
    {
      heroname: req.body.heroname,
      description: req.body.description,
      category: req.body.category,
      email: req.body.email,
      location: req.body.location
      // TODO id valiadation and name as parameter
    }
  );
  myNewHero.save((err) => {
    if (err) return res.status(500).send(err);

    res.status(201).send(myNewHero);
  });
  // res.send(MyNewHero);
};
