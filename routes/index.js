var express = require('express');
var router = express.Router();
var path = require('path');
var express = require('express');
var https = require('https');

/* GET info page. */
router.get('/info', function (req, res, next) {
  res.sendFile(path.resolve('public/info.html'));
});

/* GET chat page. */
router.get('/chatroom', function (req, res, next) {
  res.sendFile(path.resolve('public/chat.html'));
});

/* GET chat page. */
router.get('/chat/:room', function (req, res, next) {
  res.sendFile(path.resolve('public/chatroom.html'));
  
});

/* POST chat page. */
router.post('/chat', function (req, res, next) {
  res.json({
    room: `/chat/${req.body.room}`,
  });
});

router.post('/verify', function (req, res, next) {
  const options = {
    hostname: 'https://api.betterdoctor.com/2016-03-01',
    port: 443,
    path: '/todos',
    method: 'GET'
  }
});



module.exports = router;
