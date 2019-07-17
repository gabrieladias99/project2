const express = require('express');
const passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/identification');
});

// User log in, authentication, and log out routes
router.get('/userlogin', (req, res) => {
  res.render('auth/userlogin', { message: req.flash('error') });
});

router.post('/userlogin', passport.authenticate('local', {
  successRedirect: '/userprofile',
  // successRedirect points to a route
  failureRedirect: '/userlogin',
  // failureRedirect points to a route
  failureFlash: true,
  passReqToCallback: true,
}));

router.get('/userprofile', ensureLoggedIn(), (req, res) => {
  if (req.user.role === 'Music Lover') {
    res.render('profiles/musicloverprofile', { user: req.user });
  }
  if (req.user.role === 'Artist') {
    res.render('profiles/artistprofile', { user: req.user });
  }
  if (req.user.role === 'Hosting Venue') {
    res.render('profiles/hostingvenueprofile', { user: req.user });
  }
});

router.get('/userlogout', (req, res) => {
  req.logout();
  res.redirect('/userlogin');
});

module.exports = router;

// router.get('/private', checkRoles('ADMIN'), (req, res) => {
//   res.render('private', {user: req.user});
// });


// // Colocar ID como params
// router.get('/edituser', (req, res) => {
//   res.render('useractions/edituser');
// });

// router.get('/event', (req, res) => {
//   res.render('profiles/event');
// });
router.get('/map', (req,res,next) =>{
  const googleKey = process.env.GOOGLE_KEY
  res.render('maps/map', {googleKey})
})

// // Colocar ID como params
// router.get('/profileplace', (req, res) => {
//   res.render('profiles/place');
// });

// router.get('/loginartist', (req, res) => {
//   res.render('auth/loginartist');
// });


// // Colocar ID como params
// router.get('/profileartist', (req, res) => {
//   res.render('profiles/artist');
// });

// router.get('/loginplace', (req, res) => {
//   res.render('auth/loginplace');
// });

// router.get('/map', (req, res) => {
//   res.render('maps/map');
// });

