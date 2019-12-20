const express = require('express');

const router = express.Router();
const heroController = require('../controllers/heroController');

// GET list of all Heroes
router.get('/', heroController.heroList);

// GET list of Heroes with fitting name
router.get('/searchByName/:name', heroController.heroListByName);

// GET list of Heroes with fitting category
router.get('/searchByCategory/:ID', heroController.heroListByCategory);

// GET a Hero by his ID
router.get('/getData/:ID', heroController.heroGetByID);

// POST a new Hero TODO change back to post TODO solve category is in body
router.post('/create', heroController.createHero);


// router.post('/uploadPic/:ID',heroController.hero_upload_pic);


module.exports = router;
