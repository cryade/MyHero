const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(true);
});

// router.get('/authUser',function(req,res){
//   if (req.session.user != null ){
//     res.status(200).send(true);
//   }else{
//     res.status(401).send(false);
//   }
// });
// router.get('/authHero',function(req,res){
//   if (req.session.hero != null ){
//     res.status(200).send(true);
//   }else{
//     res.status(401).send(false);
//   }
// });
module.exports = router;

router.post('/signout',function(req,res){
  req.session.destroy();
  res.clearCookie('user_sid').json({
    message: "loggedOut"});
  
})