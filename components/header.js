const components = {}
components.navbar = `
<nav class="navbar navbar-expand-sm navbar-light bg-light" >
<div class="container"> 
<a class="navbar-brand" href="../index.html"><img src="https://firebasestorage.googleapis.com/v0/b/ci37-32415.appspot.com/o/brand.png?alt=media&token=786f64d7-2d70-4131-a8fe-84d2dbe319d6" style="height:100px" /></a>
<button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse ml-5" id="collapsibleNavId">
    <form class="input-group md-form form-sm form-2 pl-0 " style="width:80%" action = "http://localhost:8000/api/list-music"
    method = "GET" >
    <input class="form-control my-0 py-1 red-border" id = "keyword" type="text" placeholder="Search" aria-label="Search">
    <div class="input-group-append">
    <button class = "btn btn-outline-secondary my-sm-0"
    type = "submit"
    id = "btn-search" ><i class="fas fa-search text-grey"
              aria-hidden="true"></i></button> 
    </div>
  </form>
  <a type="button" id="sign-in-navbar" href ="#" style ="
  position: relative;
  bottom: 52px;
  right: 60px;
  font-size : 14px;
  color:#1761a0
"data-toggle="modal" data-target="#exampleModal">
<i class="fas fa-sign-in-alt"></i> Sign in
</a>
<span id="changeName"  style ="
position: relative;
bottom: 52px;
right: 115px;
font-size : 14px;
color:#1761a0 ">
</span>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Sign In</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


      <form action = "http://localhost:8000/api/sign-in" method = "GET" id="form-log-in">
      <div class="form-group">
        <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email">
      </div>

        <input type="password" class="form-control" id="InputPassword" placeholder="Enter Password">

    </form>
    </div>

 <div id="wrong-user"></div>
   
    <div class="modal-footer">


    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-success" id="btn-login-in">Login</button>
  </div>
      </div>
      
    </div>
  </div>
</div>




</div>
</div>
      
    </nav>







`

components.listMusic = `
<div class="not-found">NOT FOUND</div>
<div class="container mt-4" >
<div class="row">
<div id="list-music" class="col-lg-5">
<div class="loader"></div>
</div>

<div class="col-lg-2"></div>

<div class="col-lg-3 categories-list">
<ul>
<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/17/7/b/3/b/1592361564422_org.jpg"  class="img-categories nhac-hoa img-fluid"/ alt="nhạc Hoa">
</a>
</li>

<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/09/3/2/9/5/1591683723884_org.jpg"  class="img-categories nhac-tre img-fluid"/ alt="nhạc trẻ">
</a>
</li>

<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/09/3/2/9/5/1591683963667_org.jpg"  class="img-categories nhac-latin img-fluid"/ alt="nhạc latin">
</a>
</li>


<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/09/3/2/9/5/1591687974679_org.jpg"  class="img-categories nhac-tru-tinh img-fluid"/ alt="nhạc trữ tình">
</a>
</li>



<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/15/9/d/c/3/1592202306299_org.jpg"  class="img-categories au-my img-fluid"/ alt="âu mỹ">
</a>
</li>

<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/22/7/c/e/e/1592809802026_org.jpg"  class="img-categories nhac-kpop img-fluid" alt="nhạc kpop"/ >
</a>
</li>


</ul>
</div>
</div>


</div>
<div class="container mt-3" >
<nav aria-label="...">
<ul class="pagination" id="pagination-list-music">

</ul>
</div>
</nav>

`

components.adminDashboard = `
<table class="table container">
    
      <thead class="">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Song</th>
          <th scope="col">Title 
          <span class="dropdown" style="padding: 2px;">
      <a class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
      style=" font-size: 11px;
      color: white;
      padding: 2px;"
      >
        Sort
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" id="sort-asc">A-Z</a>
        <a class="dropdown-item" href="#" id="sort-desc">Z-A</a>
        <a class="dropdown-item" href="#" id="all-song">All Songs</a>
      </div>
    </span>
          </th>
          <th scope="col">Author</th>
        </tr>
      </thead>
      <tbody id="dashboard">
    
    
      </tbody>
    </table>
`