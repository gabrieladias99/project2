const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authRoutes = express.Router();
const bcryptSalt = 10;

authRoutes.get('/usersignup', (req, res, next) => {
  res.render('auth/usersignup');
});

authRoutes.post('/usersignup', (req, res, next) => {
  const { username, password, role } = req.body;

  if (username === '' || password === '') {
    res.render('auth/usersignup', { message: 'Indicate username and password' });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (user !== null) {
        res.render('auth/usersignup', { message: 'The username already exists' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass,
        role,
      });

      newUser.save((err) => {
        if (err) {
          res.render('auth/usersignup', { message: 'Something went wrong' });
        } else {
          res.redirect('/userlogin');
        }
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = authRoutes;
