const socket = io();
const roomName = document.querySelector('#chat-room-name');
const alertDiv = document.querySelector('#alert');
const user = JSON.parse(window.localStorage.getItem('user'));
const role = JSON.parse(window.localStorage.getItem('user'));
const usersList = document.querySelector('#user-list');
const room = window.location.pathname.replace('/chat/', '');
const chatForm = document.querySelector('#chat-form');
const chatFloor = document.querySelector('#messages');




socket.emit('enteredChat', { user: user.username, room, medical: role.medical });


socket.on('enter', message => {
    alertDiv.className = 'fade-in';
    alertDiv.innerHTML = message.text;
});

socket.on('leave', message => {
    showUsers(message.username);
});

socket.on('roomUsers', ({ room, users }) => {
    showUsers(users);
    roomNameFunction(room);
});

socket.on('chatMessage', message => {
    showMessage(message);

    chatFloor.scrollTop = chatFloor.scrollHeight;
});

// Send Message
chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = e.target.message.value;

    e.target.message.value = '';
    e.target.message.focus();

    socket.emit('chatMessage', message);
});

socket.on('notification', note => {
    if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
            var n = new Notification(note.username, {
                body: note.text
            });
        });
    }
});

const showUsers = users => {
    usersList.innerHTML = `${users.map(user => `<li>${isMedical(user.role)}${user.username}</li>`).join('')}`;
};

const isMedical = state => {
    if(state === 'yes') {
        return `<i class="heartbeat icon"></i>`
    } else if (state  === 'no') {
        return `<i class="user icon"></i>`;
    }
};

const roomNameFunction = name => {
    roomName.innerHTML = name.toUpperCase();
};

const showMessage = message => {
    const msg = `
    
    <div class="comment">
    <div class="avatar">
        <img src="https://api.adorable.io/avatars/285/${message.username}@adorable.png">
    </div>
    <div class="content">
        <p class="author">${message.username}</p>
        <div class="metadata">
            <span class="date">${message.time}</span>
        </div>
        <div class="text">
            ${message.text}
        </div>
    </div>
</div>
    `;

    const chatElement = document.createElement('div');
    chatElement.innerHTML = msg;

    chatFloor.append(chatElement);
};