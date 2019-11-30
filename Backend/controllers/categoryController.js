var Category = require('../models/categoryM');

exports.create_category = function (req, res) {
    var testcategory = new Category(
        {
            name: "He strong",

        }
    );
    testcategory.save(function (err) {
        if (err) {
            return next(err);
        }
        //successful - redirect to new book record.
    });
};

exports.delete_category = function (req, res) {
    res.send('Deleting a category is not implemented yet');
};
exports.show_categories = function (req, res) {
    res.send('Showing all  categories is not implemented yet');

};