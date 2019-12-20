const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET list of all Categories
router.get('/', categoryController.showCategory);

// POST a new cateogry
router.post('/create', categoryController.createCategory);

// GET the ID form a name
router.get('/getID/:name', categoryController.getCategoryID);

// DELETE a category
router.delete('/delete/:ID', categoryController.deleteCategory);

module.exports = router;
