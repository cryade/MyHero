const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
/* GET user listing. */
router.post('/signIn', userController.signin_user);

router.get('/',userController.user_list);

router.get('/currentuser', userController.current_user);
router.get('/isSignedIn', userController.check_login_status);

// PUT a new User
router.post('/create', userController.create_user);

// POST some changes to the userprofile
router.put('/edit', userController.edit_user);

router.post('/bookHero/:HeroID', userController.book_hero);

router.delete('/deleteUser', userController.delete_user);

module.exports = router;