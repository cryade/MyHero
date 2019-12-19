const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/categoryController');

// GET list of all Categories
router.get('/', category_controller.show_categories);

//POST a new cateogry
router.post('/create', category_controller.create_category);

//GET the ID form a name
router.get('/getID/:name', category_controller.get_categoryID);

// DELETE a category
router.delete('/delete/:ID', category_controller.delete_category);

module.exports = router;
