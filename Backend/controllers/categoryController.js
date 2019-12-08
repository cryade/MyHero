const Category = require('../models/categoryM');

exports.create_category = function(req, res) {
  const newCategory = new Category(
      {
        name:req.params.name,

      },
  );
  newCategory.save(function(err) {
    if (err) {
      return res.send(err);
    }
  });
};

exports.delete_category = function(req, res) {
  res.send('Deleting a category is not implemented yet');
};

exports.show_categories = function(req, res) {
     Category.find(function (err, Category) {
       if (err) return res.send(err);
       res.send(Category);
     })
   };

   exports.get_categoryID = function(req, res) {
    Category.findOne({name: req.params.name},function (err, Category) {
      if (err) return res.send(err);
      res.send(Category);
    })
  };
