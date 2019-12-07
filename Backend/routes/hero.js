const express = require('express');
const router = express.router();
const heroController = require('../controllers/heroController');

// GET list of all Heros
router.get('/', heroController.hero_list);

// GET list of Heros with fitting name
router.get('/search/:Name', heroController.hero_list_name);

// GET list of Heros with fitting category
router.get('/search/:Name', heroController.hero_list_name);

// GET list of Heros with fitting name
router.get('/search/:Category', heroController.hero_list_category);

// GET a Hero by his ID
router.get('/:ID/get', heroController.hero_id_get);

// PUT data into the Profile from the hero
router.put('/:ID/put', heroController.hero_id_put);

// POST a new Hero TODO change back to post
router.get('/create', heroController.create_hero);

// PUT a new Rating into the profile
router.put('/:ID/rate', heroController.rate_hero);

// PUT a Category to the hero
router.put('/:ID/addCategory', heroController.addCategory_hero);
// DELETE a Category to the hero
router.delete('/:ID/deleteCategory', heroController.deleteCategory_hero);

module.exports = router;
