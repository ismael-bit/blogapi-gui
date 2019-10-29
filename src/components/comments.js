import moment from 'moment'

var postTemplate = `
<div class="card" style="margin-top: 10px">
  <div class="card-body">
    <h5 class="card-title"><span class="oi oi-icon-name" title="icon name" aria-hidden="true"></span>{{TITLE}}</h5>
    <p class="card-text">{{BODY}}</p>
    <h6 class="card-subtitle mb-2 text-muted">by: {{NAME}} - {{EMAIL}}, <span style='color: grey'> {{DATE}} - </span><span style='color: grey'> <i>{{DATE2}}</i></span></h6>
    </br>
    <i class="fas fa-eye" ></i><label>&nbsp <span id="like-{{POSTID}}">{{NLIKE}}</span> Likes &nbsp</label>
    <i class="fas fa-thumbs-up"></i><label>&nbsp {{NVIEW}} Comentarios</label>
    <small class="text-tags text-truncate float-right"><em>{{taging}}</em></small>

    <hr>
    <div class="form-group mb-1">
    <textarea class="form-control text-comment" placeholder="Comentar aqui..." rows="3" autofocus="autofocus"></textarea>
    </br>
    <button class="btn btn-success btn-sm btn-send"><i class="fa fa-paper-plane fa-lg"></i> Comentar</button>
    </div>
    </div>
</div>
</br>
`




export function verPostComments(idPost){

    var sp = '';

    blogapi.getPost(idPost)
    .then(p => {

        sp+= postTemplate.replace('{{BODY}}',p.body)
        .replace('{{NAME}}',p.userName)
        .replace('{{EMAIL}}',p.userEmail)
        .replace('{{TITLE}}',p.title)
        .replace('{{USERID}}',p.userId)
        .replace('{{DATE}}', moment(p.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
        .replace('{{DATE2}}', moment(p.createdAt).fromNow())
        .replace('{{NLIKE}}', p.likes)
        .replace('{{NVIEW}}', p.views)
        .replace('{{colorlike}}', (p.liked==true)?'#000080':'#87CEFA')
        .replace('{{taging}}', getTags(p.tags))
        //.replace('{{taging}}', p.tags)
        .replace(/{{liked}}/g, p.liked)
        .replace(/{{POSTID}}/g, p.id)
    
        document.getElementById('app').innerHTML = sp
        document.getElementById("lblPagina").textContent = "Comentarios";

        cargarComentarios();

    })
    .catch(err => console.error(err));
}
    function getTags(data){
        var html=``;
        $(data).each(function(index,value){
            html+=`<a href="javascript:void(0)" class="btn btn-link mx-0 px-0">${$.trim(value)}</a>, `;
          })
        html = html.slice(0,-2);
        return html;
      } 

      function cargarComentarios(){


      }



export default verPostComments;