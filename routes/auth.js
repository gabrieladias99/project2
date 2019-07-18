const express = require('express');
const passport = require('passport');
const Event = require('../models/event')

const { ensureLoggedIn } = require('connect-ensure-login');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/layout');
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

router.get('/userprofile', ensureLoggedIn('/userlogin'), (req, res) => {
  if (req.user.role === 'Music Lover') {
    res.render('profiles/musicloverprofile', { user: req.user });
  }
  if (req.user.role === 'Artist') {
    Event.find({owner: req.user._id})
    .then((events) => {
      res.render('profiles/artistprofile', { user: req.user, events });
    })
    .catch((error) => console.log(error))
  }
  if (req.user.role === 'Hosting Venue') {
    res.render('profiles/venueprofile', { user: req.user });
  }
});

router.get('/userlogout', ensureLoggedIn('/userlogin'), (req, res) => {
  req.logout();
  res.redirect('/userlogin');
});

router.get('/map', (req, res, next) => {
  const googleKey = process.env.GOOGLE_KEY;
  res.render('maps/map', { googleKey });
});

module.exports = router;
