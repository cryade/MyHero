const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');

// GET list of all Heroes
router.get('/', heroController.hero_list);

// GET list of Heroes with fitting name
router.get('/searchByName/:name', heroController.hero_list_name);

// GET list of Heroes with fitting category
router.get('/searchByCategory/:ID', heroController.hero_list_name);

// GET list of Heroes with fitting name
router.get('/search/:category', heroController.hero_list_category);

// GET a Hero by his ID
router.get('/getData/:ID', heroController.hero_id_get);

// PUT data into the Profile from the hero, category is in body
router.put('/putData', heroController.hero_id_put);

// POST a new Hero TODO change back to post TODO solve category is in body
router.post('/create', heroController.create_hero);

// PUT a new Rating into the profile
router.post('/rate/:ID', heroController.rate_hero);

//router.post('/uploadPic/:ID',heroController.hero_upload_pic);


module.exports = router;
