window.onload = init

// sessionStorage.setItem('key', 'value');
let data = sessionStorage.getItem('user');
console.log(data)

async function init() {

    if (data) {
        view.showComponents('admin')
    } else {
        view.showComponents('main')
    }


}