var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
var index = require('./routes/index');
const { formatMessage, formateNotification } = require('./helper/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./helper/users');
const PORT = 3000 || process.env.PORT;
var app = express();
const server = app.listen(PORT, function () {
  console.log(`Running on Port ${PORT}`);
});

const bot = 'Speak Easy Bot';


const io = require('socket.io').listen(server);

io.on('connection', (con) => {
  console.log('connected');
  con.on('enteredChat', (chat) => {
    const user = userJoin(con.id, chat.user, chat.room);
    con.join(user.room);

    con.emit('message', formatMessage(bot, 'Welcome to Speak Easy!'));
    con.broadcast.to(user.room).emit('notification', formateNotification(bot, `${user.username} has joined the room`));
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });
  con.on('chatMessage', message => {
    
  });
}); // NOTE: End of connection



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// })

module.exports = app;
