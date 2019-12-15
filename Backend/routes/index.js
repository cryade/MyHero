const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('This is the MyHero Backend, you are not supposed to be here');
});


module.exports = router;
