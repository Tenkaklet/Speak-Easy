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
  con.on('enteredChat', (chat) => {
    const user = userJoin(con.id, chat.user, chat.room, chat.medical);
    con.join(user.room);

    con.emit('enter', formatMessage(bot, 'Welcome to Speak Easy! No chat record is stored in a database or used in any other way.'));
    con.broadcast.to(user.room).emit('notification', formateNotification(bot, `${user.username} has joined the room`));
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });
  con.on('chatMessage', message => {
    const user = getCurrentUser(con.id);
    io.to(user.room).emit('chatMessage', formatMessage(user.username, message));
  });

  con.on('disconnect', () => {
    const user = userLeave(con.id);

    if(user) {
      io.to(user.room).emit('leave', formateNotification(bot, `${user.username} has left the chat`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
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
