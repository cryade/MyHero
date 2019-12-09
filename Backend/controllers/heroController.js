const hero = require('../models/heroM');
const category = require('../models/categoryM');
const rating = require('../models/RatingM');

// GET list of all heros
exports.hero_list = function(req, res) {
 // res.send('Display a list of all heros is not implemented yet');
  hero.find().populate('category','name').exec(function (err, heroData) {
    if (err) return res.send(err);
    res.send(heroData);
  })
};

exports.hero_list_name = function(req, res) {
  hero.find({ name: { $regex: req.params.name }}).populate('category','name').exec(function (err, heroData) {
    if (err) return res.send(err);
    res.send(heroData);
  })
};
//Search by name is possible since the Category name is unique
exports.hero_list_category = function(req, res) {
  var catID = category.findOne({name: req.params.name});
  hero.find({ category: catID}).populate('category','name').exec(function (err, heroData) {
    if (err) return res.send(err);
    res.send(heroData);
  })
};

// GET a Hero by his ID
exports.hero_id_get = function(req, res) {
  hero.find({_id: req.params.ID}).populate('category','name').exec(function (err, heroData) {
    if (err) return res.send(err);
    res.send(heroData);
  })
};

exports.hero_id_put = function(req, res) {
console.log(req.body);
 hero.findByIdAndUpdate(req.params.ID,req.body,omitUndefined=false, function(err, result){
  if(err){
      console.log(err);
  }
  console.log("RESULT: " + result);
  res.send('Done')
})
};

exports.create_hero = function(req, res) {


  var myNewHero = new hero(
      {
        "name": req.body.name,
        "description": req.body.description,
        "category": req.body.category,
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
  res.send('Rate a new hero is not implemented yet');
};

exports.addCategory_hero = function(req, res) {
  res.send('Add a category to a hero is not implemented yet');
};

exports.deleteCategory_hero = function(req, res) {
  res.send('Delete a category to a hero is not implemented yet');
};
