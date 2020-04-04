const socket = io();
const roomName = document.querySelector('#chat-room-name');
const alertDiv = document.querySelector('#alert');
const user = window.localStorage.getItem('user');
const usersList = document.querySelector('#user-list');
const room = window.location.pathname.replace('/chat/', '');


alertDiv.className = 'none';




socket.emit('enteredChat', {user, room});


socket.on('message', message => {
    alertDiv.className = 'fade-in';
    alertDiv.innerHTML = message.text;
});

socket.on('roomUsers', ({room, users}) => {
    showUsers(users);
    roomNameFunction(room);
});

socket.on('notification', note => {
    if(window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
            var n = new Notification(note.username, { 
                body: note.text
            }); 
        });
    }
});

const showUsers = users => {
  usersList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;  
};

const roomNameFunction = name => {
    roomName.innerHTML = name;
};