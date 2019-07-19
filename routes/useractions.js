const express = require('express');
const router = express.Router();
const Event = require('../models/event')
const SignEvent = require('../models/signEvent')
const User = require('../models/user')
const { ensureLoggedIn } = require('connect-ensure-login');

let filter = 0

/* GET home page */
router.get('/createevent', ensureLoggedIn('/userlogin'), (req, res, next) => {
  const googleKey = process.env.GOOGLE_KEY
  res.render('useractions/createevent', { googleKey });
});

const passToNumber = (number) => {
  const arr = number.split(":")
  const finalNumber = parseInt(arr[0]) * 60 + parseInt(arr[1])
  return finalNumber
}

router.post('/createevent', ensureLoggedIn('/userlogin'), (req, res, next) => {
  const test = { owner: req.user._id };

  for (key in req.body) {
    if (!test[key]) {
      test[key] = req.body[key]
    }
  }

  console.log(test)

  test.from = passToNumber(test.from)
  test.to = passToNumber(test.to)

  const newEvent = new Event(test);

  newEvent.save()
    .then(() => {
      res.redirect('/createevent');
    })
    .catch((error) => {
      console.log(error);
    });
});

let eventlist
router.get('/api/events', (req, res, next) => {
  let { date = new Date(), from = 0, to = 1439, music = 'country' } = filter;

  if (from !== 0 && to !== 1439) {
    from = passToNumber(from)
    to = passToNumber(to)
  }

  Event.find({
    date: date,
    'from': { $gte: from },
    'to': { $lte: to }
  })
    .then(event => {
      eventlist = event
      res.status(200).json({ event });
    })
    .catch(error => console.log(error))
});

router.get('/filters', (req, res, next) => {
  res.render('useractions/filterevent');
});

router.post('/eventsfilter', (req, res, next) => {
  filter = req.body
  res.redirect('/map')
});

const passToHour = (number) => {
  hours = Math.floor(number / 60);
  min = number % 60;
  final = `${hours}:${min}`
  return final
};

router.get('/event/:id', (req, res, next) => {
  let id = req.params.id
  let artistName
  Event.find({ _id: id })
    .then((event) => {
      User.find({ _id: event[0].owner })
        .then((response) => {
          artistName = response[0].username
          let newFrom = passToHour(event[0].from)
          let newTo = passToHour(event[0].to)
          res.render('profiles/event', { response: event[0], newFrom, newTo, artistName })
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
});

router.get('/map', (req, res, next) => {
  const googleKey = process.env.GOOGLE_KEY
  res.render('maps/map', { googleKey, eventlist });
});

router.get('/event/igo/:eventid', ensureLoggedIn('/userlogin'), (req, res, next) => {
  console.log(req.user)
  const participant = req.user._id
  const event = req.params.eventid
  SignEvent.find({ participant, event })
    .then((result) => {
      if(result.length === 0 ){
        SignEvent.create({ participant, event })
        .then(() => {
          res.redirect('/userprofile')
        })
        .catch((error) => {
          throw new Error(error)
        })
      }
    })
    .catch((error) =>{
      throw new Error(error)
    })
});

router.post('/map', (req, res, next) => {
  const googleKey = process.env.GOOGLE_KEY
  res.render('maps/map', { googleKey, eventlist });
});

module.exports = router;
