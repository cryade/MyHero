const express = require('express');

const router = express.Router();
const userController = require('../controllers/UserController');
/* GET user listing. */
router.post('/signIn', userController.signinUser);

router.get('/', userController.userList);

router.get('/currentuser', userController.getCurrentUser);

// PUT a new User
router.post('/create', userController.createUser);

// POST some changes to the userprofile
router.put('/edit', userController.editUser);

router.post('/bookHero/:HeroID', userController.bookHero);

router.delete('/deleteUser', userController.deleteUser);

module.exports = router;
