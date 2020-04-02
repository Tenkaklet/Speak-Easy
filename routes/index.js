var express = require('express');
var router = express.Router();
var path = require('path');

/* GET info page. */
router.get('/info', function(req, res, next) {
  res.sendFile(path.resolve('public/info.html'));
});

/* GET chat page. */
router.get('/chatroom', function(req, res, next) {
  res.sendFile(path.resolve('public/chat.html'));
});

/* GET chat page. */
router.get('/chat/:room', function(req, res, next) {
  console.log(req.params);
  res.sendFile(path.resolve('public/chatroom.html'));
});

/* POST chat page. */
router.post('/chat', function(req, res, next) {
  console.log(req.body);
  res.json({
    room: `/chat/${req.body.room}`,
    username: req.body.username
  })
});



module.exports = router;
