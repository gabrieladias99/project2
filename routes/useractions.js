const express = require('express');
const router  = express.Router();
const Event = require('../models/event')

/* GET home page */
router.get('/createevent', (req, res, next) => {
  res.render('useractions/createevent');
});

const passToNumber = (number) => {
  const arr = number.split(":")
  const finalNumber = parseInt(arr[0])*60+ parseInt(arr[1])
  return finalNumber
}

router.post('/createevent', (req, res, next) => {
  let {
    name, date, from, to, music, latitude, longitude,
  } = req.body;

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  from = passToNumber(from)
  to = passToNumber(to)
  const time = {
    from: from,
    to: to,
  };
  const newEvent = new Event({ name, date,time, styles: music, location });

  newEvent.save()
    .then(() => {
      res.redirect('/createevent');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/api/events', (req, res, next) => {
  Event.find()
    .then(event => {
      res.status(200).json({ event });
    })
    .catch(error => console.log(error))
});


router.get('/eventsfilter', (req, res, next) => {
  res.render('useractions/filterevent')
});


router.post('/eventsfilter', (req, res, next) => {
  let {date, from, to, music} = req.body

  from = passToNumber(from)
  to = passToNumber(to)
   
  console.log(date,from,to,music)

  Event.find({date: date,
    'time.from': {$gte: from},
    'time.to': {$lte: to},
    styles:music})
    .then(event => {
      
    })
    .catch(error => console.log(error))
});
module.exports = router;
