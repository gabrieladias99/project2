const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('auth/identification');
});

router.get('/loginuser', (req,res,next) =>{
  res.render('auth/loginuser')
})

// Colocar ID como params
router.get('/profileuser', (req,res,next) =>{
  res.render('profiles/user')
})
// Colocar ID como params
router.get('/edituser', (req,res,next) =>{
  res.render('useractions/edituser')
})

router.get('/event', (req,res,next) =>{
  res.render('profiles/event')
})

// Colocar ID como params
router.get('/profileplace', (req,res,next) =>{
  res.render('profiles/place')
})

router.get('/loginartist', (req,res,next) =>{
  res.render('auth/loginartist')
})


// Colocar ID como params
router.get('/profileartist', (req,res,next) =>{
  res.render('profiles/artist')
})

router.get('/loginplace', (req,res,next) =>{
  res.render('auth/loginplace')
})

router.get('/map', (req,res,next) =>{
  const googleKey = process.env.GOOGLE_KEY
  res.render('maps/map', {googleKey})
})


module.exports = router;
