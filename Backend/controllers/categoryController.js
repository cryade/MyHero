const Category = require('../models/categoryM');

//Creates a new category, since the Category name is unique it checks whether a category with this name is in the database, if yes then the client gets a 400 error
// !!!not implemented in the frontend due time reasons!!!
exports.create_category = function (req, res) {
  Category.findOne({ name: req.body.name }).exec(function (err, catData) {
    if (catData == null) {
      const newCategory = new Category(
        {
          name: req.body.name,

        },
      );
      newCategory.save(function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(201).json({
          message: "Sucessful creation"
        }
        );

      });
    } else {
      res.status(400).json({
        message: "Category already exists"
      })
    }
  })
};

//Deletes the category which is given by the req.params.ID all references are deleted automatically
// !!!not implemented in the frontend due time reasons!!!
exports.delete_category = function (req, res) {
  Category.findOneAndDelete({ _id: req.params.ID }, function (err) {
    if (err) return res.status(500).send(err);
    res.status(200).json({
      message: "Category deleted"
    });
  })
};

//Sends all stored categories to the client
// !!!not implemented in the frontend due time reasons!!!
exports.show_categories = function (req, res) {
  Category.find(function (err, catData) {
    if (err) return res.status(500).send(err);
    res.send(catData);
  })
};

// Gets the name from a category in req.body and returns the Object ID to the client
//If there is no category with this name the client gets a 400 Error
// !!!not implemented in the frontend due time reasons!!!
exports.get_categoryID = function (req, res) {
  Category.findOne({ name: req.params.name }, function (err, catData) {
    if (err) return res.status(500).send(err);
    if (catData != null) {
      res.status(200).json({
        catID: catData._id
      })
    } else {
      res.status(400).json({
        message: "No category with that name"
      })
    }
  });

};
