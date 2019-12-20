const express = require('express');
const ratingController = require('../controllers/ratingController');

const router = express.Router();
// PUT a new Rating into the profile
router.post('/rate/:heroID', ratingController.rateHero);

router.delete('/deleteRating/:ratingID', ratingController.deleteRating);

module.exports = router;
