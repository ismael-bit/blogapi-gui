import Route from '../libs/route';
// import moment from 'moment'
// import ProfileUser from './functions';
// import PostComments, { verPostComments } from './comments';


var postearTemplate = `
<div class="card" style="margin-top: 10px">
    <div class="card-body">
      <div class="form-group mb-1">

      <input type="text" class="form-control" id="txttitle" aria-describedby="title" placeholder="Digite el título" required="" autofocus="autofocus">
      </br>
      <textarea class="form-control text-comment" placeholder="Comentar aqui..." rows="5"  id="txtbody"></textarea>
      </br>
      <input type="text" class="form-control" id="txttags" aria-describedby="title" placeholder="Tags1,Tags2,Tags3,..." required="">
      </br>
      <button class="btn btn-success btn-sm btn-send" id="btnComentar" data-postid="{{POSTID}}"><i class="fa fa-paper-plane fa-lg"></i> Publicar</button>
      </div>
    </div>
</div>
`

class Postear extends Route {

    constructor(){
        super('postear', { htmlName : '/views/post.html', default : true });
        this.onMountCb = this.whenMounted;
  }


    clickBtn3(){
        console.log("Trying btn1 on post route")
    }

   async whenMounted(){
 
    
    document.getElementById("lblPagina").textContent = "Postear";
    document.getElementById('posts').innerHTML = postearTemplate
    document.getElementById("btnComentar").addEventListener('click',Publicarevent);
    
  }

  
}

function Publicarevent(event){
  publicar()
}

function publicar(){

  var titulo = document.getElementById("txttitle").value;
  var cuerpo = document.getElementById("txtbody").value;
  var tags = document.getElementById("txttags").value;

  if(titulo==""){
    alert("Debe escribir un título");
    document.getElementById("txttitle").focus();
    return;
  }

  if(cuerpo==""){
    alert("Debe escribir un comentario");
    document.getElementById("txtbody").focus();
    return;
  }

  var data ={
      title:titulo,
      body:cuerpo,
      tags:tags.split(',').map(Function.prototype.call, String.prototype.trim)
  };
  //console.log(JSON.stringify(data))
  blogapi.createPost(data)
  .then(value => {
    window.location.href = 'index.html';
  })
  .catch(err => console.error(err));

}

var postear = new Postear();
export default postear;