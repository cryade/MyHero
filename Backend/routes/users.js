const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
/* GET user listing. */
router.get('/:ID', userController.show_user);

router.get('/',userController.user_list);


// PUT a new User
router.post('/create', userController.create_user);

// POST some changes to the userprofile
router.post('/edit/:ID', userController.edit_user);


router.delete('/delete/:ID/:RatingID', userController.delete_rating_userprofile);

router.delete('/:ID', userController.delete_user);

module.exports = router;
