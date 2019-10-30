var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('This is the MyHero Backend, you are not supposed to be here, please enter the Frontend instead. Thanks <3')
});

module.exports = router;
