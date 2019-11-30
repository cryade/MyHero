var Hero = require("../models/heroM")
var Rating = require("../models/RatingM")

//GET list of all heros
exports.hero_list = function (req, res) {
    res.send('Display a list of all heros is not implemented yet');
};


exports.hero_list_name = function (req, res) {
    res.send('Display a list of heros matching to the name xy is not implemented yet');
};

exports.hero_list_category = function (req, res) {
    res.send('Display a list of heros matching to the category xy is not implemented yet');
};

exports.hero_id_get = function (req, res) {
    res.send('Display a hero is not implemented yet');
};

exports.hero_id_put = function (req, res) {
    res.send('Display a hero is not implemented yet');
};

exports.create_hero = function (req, res) {
    //res.send('Post a new hero is not implemented yet');
    var MyNewHero = new Hero(
        {
            name: req.body.name,
            description: req.body.description,

        }
    );
    MyNewHero.save(function (err) {
        if (err) {
            return next(err);
        }
        //successful - redirect to new book record.
        res.redirect(testhero.url);
    });
    // res.send(testhero);


};

exports.rate_hero = function (req, res) {
    res.send('Rate a new hero is not implemented yet')
};

exports.addCategory_hero = function (req, res) {
    res.send('Add a category to a hero is not implemented yet')
};

exports.deleteCategory_hero = function (req, res) {
    res.send('Delete a category to a hero is not implemented yet')
};