$(() => {
    $('.ui.dropdown').dropdown();

    $('.form').submit((e) => {
        e.preventDefault();
        const username = $('#username').val();
        const room = $('#room').val();
        console.log(username, room);
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