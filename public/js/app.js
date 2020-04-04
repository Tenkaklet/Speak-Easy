$(() => {
    $('.ui.dropdown').dropdown();

    $('#chat-room-form').submit((e) => {
        e.preventDefault();
        const username = $('#username').val();
        const room = $('#room').val();
        const medical = $('#medical').val();
        console.log(medical);
        if (medical === 'yes') {
            // api call to better doctor
            $('.ui.modal').modal('show');
            $('#verification-form').submit((e) => {
                e.preventDefault();
                const firstName = $('#first-name').val();
                const lastName = $('#last-name').val();
                $.ajax({
                    url: '/verify',
                    data: {
                        firstName,
                        lastName
                    },
                    method: 'POST'
                })
            });
        } else {
            // it is a no and no verification needed.
        }
        window.localStorage.setItem('user', JSON.stringify({username, medical}));
        // $.ajax({
        //     url: '/chat',
        //     data: {
        //         username,
        //         room
        //     },
        //     method: 'POST'
        // }).done(d => {
        //     window.location = d.room;
        // });
    });
    
});