var express = require('express');
var router = express.Router();
var category_controller = require('../controllers/categoryController');

//GET list of all Categories
router.get('/', category_controller.show_categories);
//PUT a new category
router.put('/', category_controller.create_category);
//DELETE a category
router.delete('/', category_controller.delete_category);

module.exports = router;