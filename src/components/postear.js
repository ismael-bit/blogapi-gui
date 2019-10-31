import Route from '../libs/route';
// import moment from 'moment'
// import ProfileUser from './functions';
// import PostComments, { verPostComments } from './comments';


var postearTemplate = `
<div class="card" style="margin-top: 10px">
    <div class="card-body">
      <div class="form-group mb-1">

      <input type="text" class="form-control" id="title" aria-describedby="title" placeholder="Digite el título" required="" autofocus="autofocus">
      </br>
      <textarea class="form-control text-comment" placeholder="Comentar aqui..." rows="5"  id="txtComentario"></textarea>
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

      
  }

}

var postear = new Postear();
export default postear;