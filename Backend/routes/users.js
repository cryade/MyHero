var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController')
/* GET user listing. */
router.get('/:ID', user_controller.show_user);

//PUT a new User
router.put('/create', user_controller.create_user);

//POST some changes to the userprofile
router.post('/:ID/edit', user_controller.edit_user);

router.delete('/:ID/:RatingID/delete', user_controller.delete_rating_userprofile);

router.delete('/:ID', user_controller.delete_user);



module.exports = router;
