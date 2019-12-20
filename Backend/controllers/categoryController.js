const Category = require('../models/categoryM');

// Creates a new category, since the Category name is unique it checks whether a category
// with this name is in the database, if yes then the client gets a 400 error
// !!!not implemented in the frontend due time reasons!!!
exports.createCategory = function createCategory(req, res) {
  Category.findOne({ name: req.body.name }).exec((err, catData) => {
    if (catData == null) {
      const newCategory = new Category(
        {
          name: req.body.name

        }
      );
      newCategory.save((errT) => {
        if (errT) {
          return res.status(500).send(errT);
        }
        return res.status(201).json({
          message: 'Sucessful creation'
        });
      });
    }
    else {
      return res.status(400).json({
        message: 'Category already exists'
      });
    }
  });
};

// Deletes the category which is given by the req.params.ID all references are deleted automatically
// !!!not implemented in the frontend due time reasons!!!
exports.deleteCategory = function deleteCategory(req, res) {
  Category.findOneAndDelete({ _id: req.params.ID }, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({
      message: 'Category deleted'
    });
  });
};

// Sends all stored categories to the client
// !!!not implemented in the frontend due time reasons!!!
exports.showCategory = function showCategory(req, res) {
  Category.find((err, catData) => {
    if (err) return res.status(500).send(err);
    return res.send(catData);
  });
};

// Gets the name from a category in req.body and returns the Object ID to the client
// If there is no category with this name the client gets a 400 Error
// !!!not implemented in the frontend due time reasons!!!
exports.getCategoryID = function getCategoryID(req, res) {
  Category.findOne({ name: req.params.name }, (err, catData) => {
    if (err) return res.status(500).send(err);
    if (catData != null) {
      res.status(200).json({
        catID: catData._id
      });
    }
    else {
      res.status(400).json({
        message: 'No category with that name'
      });
    }
  });
};
