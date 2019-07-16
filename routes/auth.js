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
  failureRedirect: '/userlogin',
  failureFlash: true,
  passReqToCallback: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/userlogin');
});

// User log in, authentication, and log out routes

// Colocar ID como params
router.get('/userprofile', ensureLoggedIn(), (req, res) => {
  res.render('profiles/user');
});
// Colocar ID como params
router.get('/edituser', (req, res) => {
  res.render('useractions/edituser');
});

router.get('/event', (req, res) => {
  res.render('profiles/event');
});

// Colocar ID como params
router.get('/profileplace', (req, res) => {
  res.render('profiles/place');
});

router.get('/loginartist', (req, res) => {
  res.render('auth/loginartist');
});


// Colocar ID como params
router.get('/profileartist', (req, res) => {
  res.render('profiles/artist');
});

router.get('/loginplace', (req, res) => {
  res.render('auth/loginplace');
});

router.get('/map', (req, res) => {
  res.render('maps/map');
});

module.exports = router;
