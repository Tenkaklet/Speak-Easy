$(() => {
    $('.ui.dropdown').dropdown();

    $('.form').submit((e) => {
        e.preventDefault();
        const username = $('#username').val();
        const room = $('#room').val();
        window.localStorage.setItem('user', username);
        $.ajax({
            url: '/chat',
            data: {
                username,
                room
            },
            method: 'POST'
        }).done(d => {
            window.location = d.room;
        })
    });
});