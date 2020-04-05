$(() => {
    $('.ui.dropdown').dropdown();

    $('#chat-room-form').submit((e) => {
        e.preventDefault();
        const username = $('#username').val();
        const room = $('#room').val();
        const medical = $('#medical').val();
        if (medical === 'yes') {
            // api call to better doctor
            $('.ui.modal.doctor').modal('show');
            $('#verification-form').submit((e) => {
                e.preventDefault();
                const profession = $('#profession').val();
                window.localStorage.setItem('user', JSON.stringify({username, medical: profession}));
                $.ajax({
                    url: '/chat',
                    data: {
                        username,
                        room
                    },
                    method: 'POST'
                }).done(d => {
                    window.location = d.room;
                });
    
            });
        } else {
            // it is a no and no verification needed.
            $.ajax({
                url: '/chat',
                data: {
                    username,
                    room
                },
                method: 'POST'
            }).done(d => {
                window.location = d.room;
            });
            window.localStorage.setItem('user', JSON.stringify({username, medical: 'user'}));
        }
    });

    function verify(username) {
        
    }
});