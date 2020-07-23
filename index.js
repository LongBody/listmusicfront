window.onload = init

// sessionStorage.setItem('key', 'value');
let data = sessionStorage.getItem('user');

async function init() {

    if (data) {
        view.showComponents('admin')
    } else {
        view.showComponents('main')
        var socket = io.connect('https://listmusicnodejs.herokuapp.com');
        socket.emit("user-online");

        socket.on("server-user-online", function(data) {
            $('#user-online-server-emit').html("Online :" + data)
        });
    }
}