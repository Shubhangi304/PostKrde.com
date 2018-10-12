var express = require('express');
var router = express.Router();

router.use(function(req,res,next){
  if(req.session.unm==undefined || req.session.role!='user')
  {
    console.log('invalid user please login first')
    res.redirect('/logout')
  }
  next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userhome',{'unm':req.session.unm,'role':req.session.role})
});

module.exports = router;
