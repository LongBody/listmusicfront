const components = {}
components.navbar = `
<nav class="navbar navbar-expand-sm navbar-light bg-light" >
<div class="container"> 
<a class="navbar-brand" href="../index.html"><img src="https://firebasestorage.googleapis.com/v0/b/ci37-32415.appspot.com/o/brand.png?alt=media&token=786f64d7-2d70-4131-a8fe-84d2dbe319d6" style="height:100px"/></a>
<button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse ml-5" id="collapsibleNavId">
    <form class="input-group md-form form-sm form-2 pl-0 " style="width:80%" action = "http://localhost:8000/api/list-music"
    method = "GET" >
    <input class="form-control my-0 py-1 red-border" id = "keyword" type="text" placeholder="Search" aria-label="Search">
    <div class="input-group-append">
    <button class = "btn btn-outline-secondary my-2 my-sm-0"
    type = "submit"
    id = "btn-search" ><i class="fas fa-search text-grey"
              aria-hidden="true"></i></button> 
    </div>
  </form>


</div>
</div>
      
    </nav>
`

components.listMusic = `
<div class="container mt-4" >
<div class="row">
<div id="list-music" class="col-lg-5">
</div>
<div class="col-lg-2"></div>

<div class="col-lg-3">
<ul>
<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/thumb/2020/06/17/7/d/8/9/1592361564344_org.jpg"  class="img-categories img-fluid"/>
</a>
</li>

<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/09/3/2/9/5/1591683723884_org.jpg"  class="img-categories img-fluid"/>
</a>
</li>

<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/09/3/2/9/5/1591683963667_org.jpg"  class="img-categories img-fluid"/>
</a>
</li>


<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/09/3/2/9/5/1591687974679_org.jpg"  class="img-categories img-fluid"/>
</a>
</li>



<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/15/9/d/c/3/1592202306299_org.jpg"  class="img-categories img-fluid"/>
</a>
</li>

<li class="mt-2">
<a >
<img src="https://avatar-nct.nixcdn.com/topic/mobile/2020/06/22/7/c/e/e/1592809802026_org.jpg"  class="img-categories img-fluid"/>
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
