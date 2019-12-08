const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
/* GET user listing. */
router.get('/:ID', userController.show_user);

// PUT a new User
router.put('/create', userController.create_user);

// POST some changes to the userprofile
router.post('/:ID/edit', userController.edit_user);

router.delete('/:ID/:RatingID/delete', userController.delete_rating_userprofile);

router.delete('/:ID', userController.delete_user);


module.exports = router;
