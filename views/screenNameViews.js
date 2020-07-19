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


                myWeb.innerHTML = components.navbar + components.listMusic


                myMusic.innerHTML = ''

                let url = "https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&pageIndex=1"
                let response = await fetch(url)
                let body = await response.json()

                listMusic(body);

                let btnSearch = document.getElementById("btn-search")
                let keyword = document.getElementById("keyword")
                let pagination = document.getElementById("pagination-list-music")
                let pageClick = document.getElementById("page-click")

                pagination.innerHTML = ``
                for (let page = 1; page <= 3; page++) {
                    let classPage = 'page' + page
                    let currentPage = 'pageCurrent' + page
                    $('.pageCurrent1').attr('class', 'page-item pageCurrent1 active')
                    pagination.innerHTML += `
                    <li class="page-item ${currentPage} "><a class="${classPage} page-link" value =${page} href="#">${page}</a></li>`



                }

                for (let page = 1; page <= 3; page++) {
                    let classPage = 'page' + page
                    $('.' + classPage).click(async function() {
                        console.log($('.' + classPage).html())
                        let page = $('.' + classPage).html()
                        let queryString = "https://listmusicnodejs.herokuapp.com/api/list-music/?pageSize=8&pageIndex=" + page
                        let response = await fetch(queryString + "")
                        let body = await response.json()
                        let currentPage = 'page-item page' + page
                        console.log(currentPage)
                        listMusic(body)
                        $('.active').removeClass('active')
                        let currentPageActive = 'active page-item pageCurrent' + page
                        $('.pageCurrent' + page).attr('class', currentPageActive)

                    })

                }


                btnSearch.addEventListener('click', async function(e) {
                    e.preventDefault();
                    let keywordValue = keyword.value;
                    console.log(keywordValue)
                    let queryString = "https://listmusicnodejs.herokuapp.com/api/list-music/find/?search=" + keywordValue
                    let response = await fetch(queryString + "")
                    let body = await response.json()
                    listMusic(body)

                })




                break
            }

    }
}

async function listMusic(body) {
    var listMusic = document.getElementById("list-music")
    let myMusic = document.getElementById('my-music')

    listMusic.innerHTML = ""
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