const ratingController = require('../controllers/ratingController');
const express = require('express');
const router = express.Router();
// PUT a new Rating into the profile
router.post('/rate/:heroID', ratingController.rate_hero);

router.delete('/deleteRating/:ratingID', ratingController.delete_rating);

module.exports = router;
