const express = require('express');
const router = express.Router();
const Event = require('../models/event')



/* GET home page */
router.get('/createevent', (req, res, next) => {
  res.render('useractions/createevent');
});

const passToNumber = (number) => {
  const arr = number.split(":")
  const finalNumber = parseInt(arr[0]) * 60 + parseInt(arr[1])
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
  const newEvent = new Event({ name, date, time, styles: music, location });

  newEvent.save()
    .then(() => {
      res.redirect('/createevent');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/api/events', (req, res, next) => {
  let { date = new Date(), from = 0, to = 1439, music='country' } = filter

  console.log(date,from,to,music)
  if(from!== 0 && to !== 1439){
    from = passToNumber(from)
    to = passToNumber(to)
  }
  
  Event.find({ date:date,
    'time.from': {$gte: from},
    'time.to': {$lte:to}})
    .then(event => {
      res.status(200).json({ event });
    })
    .catch(error => console.log(error))
});


router.get('/filters', (req, res, next) => {
  res.render('useractions/filterevent')
});

let filter = 0

router.post('/eventsfilter', (req, res, next) => {
  filter = req.body
  console.log(filter)
  res.redirect('/map')
});
module.exports = router;
