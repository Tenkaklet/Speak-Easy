var express = require('express');
var router = express.Router();
var path = require('path');
var express = require('express');


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



module.exports = router;
