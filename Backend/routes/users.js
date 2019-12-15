const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
/* GET user listing. */
router.post('/signIn/', userController.signin_user);

router.get('/',userController.user_list);


// PUT a new User
router.post('/create', userController.create_user);

// POST some changes to the userprofile
router.put('/edit/', userController.edit_user);


router.delete('/delete/:RatingID', userController.delete_rating_userprofile);

router.delete('/:ID', userController.delete_user);

router.post('/signout', userController.signout)
module.exports = router;
