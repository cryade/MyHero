var express = require('express');
var router = express.Router();
var hero_controller = require('../controllers/heroController');

//GET list of all Heros
router.get('/', hero_controller.hero_list);

//GET list of Heros with fitting name
router.get('/search/:Name', hero_controller.hero_list_name);

//GET list of Heros with fitting category
router.get('/search/:Name', hero_controller.hero_list_name);

//GET list of Heros with fitting name
router.get('/search/:Category', hero_controller.hero_list_category);

//GET a Hero by his ID
router.get('/:ID/get', hero_controller.hero_id_get);

//PUT data into the Profile from the hero
router.put('/:ID/put', hero_controller.hero_id_put);

//POST a new Hero
router.post('/create', hero_controller.create_hero);

//PUT a new Rating into the profile
router.put('/:ID/rate', hero_controller.rate_hero);

//PUT a Category to the hero
router.put('/:ID/addCategory', hero_controller.addCategory_hero);
//DELETE a Category to the hero
router.delete('/:ID/deleteCategory', hero_controller.deleteCategory_hero);

module.exports = router;