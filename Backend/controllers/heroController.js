const Hero = require('../models/heroM');
const Rating = require('../models/RatingM');
const User = require('../models/userM');


// GET list of all heroes
exports.hero_list = function(req, res) {
 // res.send('Display a list of all heroes is not implemented yet');
  Hero.find().populate({path:'category',select: 'name'}).exec(function (err, heroData) {
    if (err) return res.status(400).send(err);
    res.status(200).send(heroData);
  })
};

exports.hero_list_name = function(req, res) {
  Hero.find({ heroname: { $regex: req.params.name }}).populate('category','name').exec(function (err, heroData) {
    if (err) return res.send(err);
    res.send(heroData);
  })
};
//Search by name is possible since the Category name is unique

exports.hero_list_category = function(req, res) {
  Hero.find({ category: req.params.ID}).populate('category','name').exec(function (err, heroData) {
    if (err) return res.send(err);
    res.send(heroData);
  })
};

// GET a Hero by his ID
exports.hero_id_get = function(req, res) {
  Hero.findOne({_id: req.params.ID}).populate('category','name').populate('rating', '-hero').exec(function (err, heroData) {
    if (err) return res.send(err);
    console.log(heroData);
    res.send(heroData);
  })
};

exports.hero_id_put =  function(req, res) {
  Hero.findByIdAndUpdate(req.params.ID,req.body, function(err, result){
      if(err){
          console.log(err);
      }
      res.send(result);
    })}
  
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


exports.create_hero = function(req, res) {
  var myNewHero = new Hero(
      {
        "heroname": req.body.heroname,
        "description": req.body.description,
        "category": req.body.category,
        "email": req.body.email,
        //TODO id valiadation and name as parameter
      },
  );
  myNewHero.save(function(err) {
    if (err) return res.send(err);

    res.send(myNewHero);
  });
  // res.send(MyNewHero);
};

exports.rate_hero = function(req, res) {
var myNewRating = new Rating(
  {
    "title": req.body.title,
    "description": req.body.description,
    "rating": req.body.rating,
    "user": req.body.userid,
    "hero": req.params.ID,

    //TODO id valiadation and name as parameter
  },
);

myNewRating.save(function(err,ratingData) {
if (err) return res.send(err);
console.log(myNewRating);

User.updateOne({_id: req.session.user.userid},{$push: {ratings: ratingData._id}}, function(err, userData){
  if(err){
    console.log(err);
}
console.log(userData);
console.log("tst");


Hero.updateOne(req.params.ID,{$push: { ratings: ratingData._id}}, function(err, heroData){
    if(err){
        console.log(err);
    }
    console.log(heroData);
  })
});
})
res.send("done");
};



