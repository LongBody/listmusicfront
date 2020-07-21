const view = {
    currentScreen: null
}
view.showComponents = async function(screenName) {
    view.currentScreen = screenName

    switch (screenName) {

        case 'main':
            {
                let myWeb = document.getElementById('my-web')

                let myMusic = document.getElementById('my-music')

                let categoriesMusic = ["nhac-hoa", "nhac-tre", "nhac-latin", "nhac-tru-tinh", "au-my", "nhac-kpop"]


                myWeb.innerHTML = components.navbar + components.listMusic


                myMusic.innerHTML = ''

                let url = "https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&pageIndex=1"
                let response = await fetch(url)
                let body = await response.json()

                listMusic(body);

                let urlPage = "https://listmusicnodejs.herokuapp.com/api/list-music"
                let responsePage = await fetch(urlPage)
                let bodyPage = await responsePage.json()


                let btnSearch = document.getElementById("btn-search")
                let keyword = document.getElementById("keyword")

                let sizePagination = Math.ceil(bodyPage.length / 8)

                pagination(sizePagination)

                let queryPage = "https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&pageIndex="

                nextPage(queryPage, sizePagination)

                btnSearch.addEventListener('click', async function(e) {
                    $('#list-music').html(`<div class="loader"></div>`)
                    e.preventDefault();
                    let keywordValue = keyword.value;
                    let queryString = "https://listmusicnodejs.herokuapp.com/api/list-music/find/?search=" + keywordValue
                    let response = await fetch(queryString + "")
                    let body = await response.json()

                    if (body.length == 0) {
                        $('#list-music').html(`<div class="not-found" style="display:block">NOT FOUND - 404</div>`)
                    } else {
                        listMusic(body)
                        pagination(Math.ceil(body.length / 8))
                    }


                })


                for (let item of categoriesMusic) {
                    $('.' + item).click(async function() {

                        $('#list-music').html(`<div class="loader"></div>`)
                            // $('.not-found').css('display', 'none')
                        let keywordValue = $('.' + item).attr('alt')

                        let queryString = "https://listmusicnodejs.herokuapp.com/api/categories/find/?search=" + keywordValue
                        let response = await fetch(queryString + "")
                        let body = await response.json()

                        let queryStringCategories = "https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&pageIndex=1&search=" + body
                        let queryStringGetAll = "https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&&search=" + body
                        let queryStringNextPage = "https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&&search=" + body + "&pageIndex="

                        let responseCategories = await fetch(queryStringCategories + "")
                        let responseGetAll = await fetch(queryStringGetAll + "")
                        let bodyCategories = await responseCategories.json()
                        let bodyGetAll = await responseGetAll.json()

                        let sizePage = Math.ceil(bodyGetAll.length / 8)
                        pagination(sizePage)
                        nextPage(queryStringNextPage, sizePage)

                        if (responseCategories.status === 400) {
                            $('#list-music').html(`<div class="not-found" style="display:block">NOT FOUND - 404</div>`)
                        } else {
                            listMusic(bodyCategories)
                        }

                    })

                }

                $("#btn-login-in").click(async function(e) {
                    e.preventDefault()
                    let email = $("#InputEmail").val()
                    let password = $("#InputPassword").val()

                    let queryString = "https://listmusicnodejs.herokuapp.com/api/sign-in/?email=" + email + "&password=" + password
                    let response = await fetch(queryString + "")
                    let body = await response.json()

                    if ((body.message == "Missing email")) {
                        $('#wrong-user').html(`<div class="alert alert-danger" role="alert" style ="height">
                        Missing email</div>`)
                    } else if (body.message == "Missing password") {
                        $('#wrong-user').html(`<div class="alert alert-danger" role="alert" style ="height">
                        Missing Password</div>`)
                    } else if (body.message == "Wrong email or password") {
                        $('#wrong-user').html(`<div class="alert alert-danger" role="alert" style ="height">
                        Check your email and password again</div>`)
                    } else {
                        sessionStorage.setItem('user', body[0].fullName);
                        view.showComponents('admin')

                    }
                })
                $('#btn-page-next').click(async function() {
                    let currentPageActiveClass = document.getElementsByClassName('active')
                    let currentPage = currentPageActiveClass[0].innerText
                    let pageNext = parseInt(currentPage) + 1

                    if (pageNext == sizePagination + 1) {
                        pageNext -= 1
                    }


                    $('#list-music').html(`<div class="loader"></div>`)
                    let queryString = 'https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&pageIndex=' + pageNext

                    let response = await fetch(queryString + "")
                    let body = await response.json()
                        // let currentPageClass = 'page-item page' + pageNext
                    listMusic(body)
                    $('.active').removeClass('active')
                    let currentPageActive = 'active page-item pageCurrent' + pageNext
                    $('.pageCurrent' + pageNext).attr('class', currentPageActive)

                })

                $('#btn-page-previous').click(async function() {
                    let currentPageActiveClass = document.getElementsByClassName('active')
                    let currentPage = currentPageActiveClass[0].innerText
                    let pageNext = parseInt(currentPage) - 1


                    if (pageNext == 0) {
                        pageNext = 1
                    }

                    $('#list-music').html(`<div class="loader"></div>`)
                    let queryString = 'https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&pageIndex=' + pageNext

                    let response = await fetch(queryString + "")
                    let body = await response.json()
                    listMusic(body)
                    $('.active').removeClass('active')
                    let currentPageActive = 'active page-item pageCurrent' + pageNext
                    $('.pageCurrent' + pageNext).attr('class', currentPageActive)


                })



                break
            }

        case 'admin':
            {
                let myWeb = document.getElementById('my-web')
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                myWeb.innerHTML = components.navbar + components.adminDashboard
                let dashboardAdmin = document.getElementById('dashboard')
                let btnSearch = document.getElementById("btn-search")
                let keyword = document.getElementById("keyword")
                let myMusic = document.getElementById('my-music')
                myMusic.innerHTML = `
                `

                let urlPage = "https://listmusicnodejs.herokuapp.com/api/list-music"
                let response = await fetch(urlPage)
                let body = await response.json()

                let data = sessionStorage.getItem('user');
                $('#changeName').html(data + " (Admin)")
                $('#btn-log-out').css('display', "block")
                $('#sign-in-navbar').hide()

                $('#btn-log-out').click(function() {
                    sessionStorage.removeItem('user')
                    view.showComponents('main')
                })

                for (let i = 0; i < body.length; i++) {

                    html = `
                    <tr>
                    <th scope="row">${i}</th>
                    <td> <image class="img-fluid card" src = "${body[i].imageLink}" style="height:50px"/> </td>
                    <td style = "font-weight : 500">${body[i].title}</td>
                    <td style = "font-weight : 300">${body[i].author}</td>
                    </tr>`
                    dashboardAdmin.innerHTML += html

                }


                btnSearch.addEventListener('click', async function(e) {
                    $('#dashboard').html(`<div class="loader"></div>`)
                    e.preventDefault();
                    let keywordValue = keyword.value;
                    let queryString = "https://listmusicnodejs.herokuapp.com/api/list-music/find/?search=" + keywordValue
                    let response = await fetch(queryString + "")
                    let body = await response.json()

                    if (body.length == 0) {
                        $('#dashboard').html(`<div class="not-found" style="display:block">NOT FOUND - 404</div>`)
                    } else {
                        listMusicAdmin(body)
                    }


                })

                $("#sort-asc").click(async function() {
                    console.log('ok')
                    $('#dashboard').html(`<div class="loader"></div>`)
                    let urlPage = "https://listmusicnodejs.herokuapp.com/api/list-music/?sort=asc&sortBy=title"
                    let response = await fetch(urlPage)
                    let body = await response.json()
                    console.log(body)
                    listMusicAdmin(body)
                })

                $("#sort-desc").click(async function() {
                    $('#dashboard').html(`<div class="loader"></div>`)
                    let urlPage = "https://listmusicnodejs.herokuapp.com/api/list-music/?sort=desc&sortBy=title"
                    let response = await fetch(urlPage)
                    let body = await response.json()
                    listMusicAdmin(body)
                })
                $("#all-song").click(async function() {
                    $('#dashboard').html(`<div class="loader"></div>`)
                    let urlPage = "https://listmusicnodejs.herokuapp.com/api/list-music"
                    let response = await fetch(urlPage)
                    let body = await response.json()
                    listMusicAdmin(body)
                })




            }

    }
}

async function listMusic(body) {
    var listMusic = document.getElementById("list-music")
    let myMusic = document.getElementById('my-music')

    listMusic.innerHTML = `
    <div class="loader-page" style="display:none"></div>`
    let html;
    for (let item of body) {
        let { title, imageLink, author, musicLink, _id } = item

        html = `
        <div class="row mt-2 wrap-content-music ${_id}"  value="${musicLink}">
        <div class=" image-link">
            <image class="img-fluid card" src = "${imageLink}" style="height:50px"/> 
        </div>
        <div class=" ml-2">
        <a href="${musicLink}" id="listen-music-link"></a>
            <div class="title-song ${musicLink}">${title}</div>
            <div class="author">${author}</div>
        </div>
    </div>`
        listMusic.innerHTML += html
        var listenMusicIframe = document.getElementById("listen-music-iframe")
    }

    for (let item of body) {
        let { _id } = item
        for (let i = 0; i <= _id.length; i++) {
            $('.' + _id).click(async function() {
                let link = $('.' + _id).attr('value')
                myMusic.innerHTML = `
                    <iframe src="${link}"  style="height: 100%;width:100%" frameborder="0" allowfullscreen allow="autoplay"></iframe>
                    `
            })
        }

    }

}


async function listMusicAdmin(body) {
    let dashboardAdmin = document.getElementById('dashboard')

    dashboardAdmin.innerHTML = `
    <div class="loader-page" style="display:none"></div>`
    let html;
    for (let i = 0; i < body.length; i++) {

        html = `
        <tr>
        <th scope="row">${i}</th>
        <td> <image class="img-fluid card" src = "${body[i].imageLink}" style="height:50px"/> </td>
        <td style = "font-weight : 500">${body[i].title}</td>
        <td style = "font-weight : 300">${body[i].author}</td>
        </tr>`
        dashboardAdmin.innerHTML += html

    }

}


function pagination(sizePage) {
    let pagination = document.getElementById("pagination-list-music")
        // let pageClick = document.getElementById("page-click")

    pagination.innerHTML = `<li class="page-item pageCurrent" id="btn-page-previous"><a class="page-link" href="#">Previous</a></li>`
    for (let page = 1; page <= sizePage; page++) {
        let classPage = 'page' + page
        let currentPage = 'pageCurrent' + page
        $('.pageCurrent1').attr('class', 'page-item pageCurrent1 active')
        pagination.innerHTML += `
    <li class="page-item ${currentPage} value =${page}"><a class="${classPage} page-link" href="#">${page}</a></li>`

    }
    pagination.innerHTML += `<li class="page-item pageCurrent" id="btn-page-next"><a class="page-link" href="#">Next</a></li>`
}


function nextPage(queryStringNextPage, sizePage) {

    for (let page = 1; page <= sizePage; page++) {
        let classPage = 'page' + page
        $('.' + classPage).click(async function() {
            // console.log(classPage.replace('page', ''))
            $('#list-music').html(`<div class="loader"></div>`)
            let page = $('.' + classPage).html()
            let queryString = queryStringNextPage + page
            let response = await fetch(queryString + "")
            let body = await response.json()
            listMusic(body)

            $('.active').removeClass('active')
            let currentPageActive = 'active page-item pageCurrent' + page

            $('.pageCurrent' + page).attr('class', currentPageActive)
        })

    }





}