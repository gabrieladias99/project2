const express = require('express');
const router = express.Router();
const Event = require('../models/event')
const User = require('../models/user')
const {ensureLoggedIn} = require('connect-ensure-login');


/* GET home page */
router.get('/createevent', ensureLoggedIn('/userlogin'), (req, res, next) => {
  const googleKey = process.env.GOOGLE_KEY
  res.render('useractions/createevent', {googleKey});
});

const passToNumber = (number) => {
  const arr = number.split(":")
  const finalNumber = parseInt(arr[0]) * 60 + parseInt(arr[1])
  return finalNumber
}


router.post('/createevent', ensureLoggedIn('/userlogin'), (req, res, next) => {
  let {
    name, date, from, to, music, address
  } = req.body;

  let owner = req.user._id
  console.log(owner)

  from = passToNumber(from)
  to = passToNumber(to)
  const time = {
    from: from,
    to: to,
  };
  const newEvent = new Event({ name, date, time, styles: music, address, owner });

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

const passToHour = (number) => {
  hours = Math.floor(number / 60);
  min = number % 60;
  final = `${hours}:${min}`
  return final
}


router.get('/event/:id', (req,res,next)=>{
  let id = req.params.id
  let artistName
  Event.find({_id:id})
  .then((event) => { 
    User.find({_id:event[0].owner})
      .then((response) => {
       artistName = response[0].username
       let newFrom = passToHour(event[0].time.from)
       let newTo = passToHour(event[0].time.to)
       res.render('profiles/event',{response: event[0], newFrom, newTo, artistName})
      })
      .catch((error) => console.log(error))
  })
  .catch((error) => console.log(error))
})


module.exports = router;
