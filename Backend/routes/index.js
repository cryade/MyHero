const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('This is the MyHero Backend, you are not supposed to be here');
});

router.get('/auth',function(req,res){
  if (req.session.user != null ){
    res.status(200).send(true);
  }else{
    res.status(401).send(false);
  }
});
module.exports = router;
