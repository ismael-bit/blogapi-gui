import moment from 'moment'

var postTemplate = `
<div class="card" style="margin-top: 10px">
  <div class="card-body">
    <h5 class="card-title"><span class="oi oi-icon-name" title="icon name" aria-hidden="true"></span>{{TITLE}}</h5>
    <p class="card-text">{{BODY}}</p>
    <h6 class="card-subtitle mb-2 text-muted">by: {{NAME}} - {{EMAIL}}, <span style='color: grey'> {{DATE}} - </span><span style='color: grey'> <i>{{DATE2}}</i></span></h6>
    </br>
    <i class="fas fa-thumbs-up" ></i><label>&nbsp <span id="like-{{POSTID}}">{{NLIKE}}</span> Likes &nbsp</label>
    <i class="fas fa-eye"></i><label>&nbsp <span id="view-{{POSTID}}">{{NVIEW}}</span> Vistas &nbsp</label>
    <i class="fas fa-comments"></i><label>&nbsp <span id="comment-{{POSTID}}">{{NCOMMENT}}</span> Comentarios</label>

    <small class="text-tags text-truncate float-right"><em>{{taging}}</em></small>

    <hr>
    <div class="form-group mb-1">
    <textarea class="form-control text-comment" placeholder="Comentar aqui..." rows="3" autofocus="autofocus" id="txtComentario"></textarea>
    </br>
    <button class="btn btn-success btn-sm btn-send" id="btnComentar" data-postid="{{POSTID}}"><i class="fa fa-paper-plane fa-lg"></i> Comentar</button>
    </div>
    </div>
</div>
</br>
`
{/* <i class="fas fa-eye" ></i><label>&nbsp <span id="like-{{POSTID}}">{{NLIKE}}</span> Likes &nbsp</label> */}


var commentsTemplateH = `
<div class="card mb-3">
<div class="card-header"><i class="fas fa-chart-area"></i>Comentarios</div>
<div class="comment-content" id="articulo-comments-content-59">
`
var commentsTemplateF = 
`
</div>
</div>
`

var commentsTemplate = `
  <div class="card comments mb-1 comment-item" style="width: 98%;">
      <div class="card-body posts py-2">
          <div class="card-title blockquote-footer text-truncate">
              <i class="fa fa-user"></i> 
              <b>By:</b>
              <a class="showprofile" href="javascript:void(0);" data-ownerid="19"> 
                  <b class="post-owner">{{USER}} ({{EMAIL}})</b>
              </a>
              <em class="commentdate">{{FECHACOMENTARIO}}</em>
          </div>
          {{COMENTARIO}}
      </div>
  </div>
`

var postxxx= '';

document.addEventListener('likes',  function(event){
  event = event.detail;
  document.getElementById("like-"+event.postId).textContent = event.likes;
  }
  );
  document.addEventListener('view-post',  function(event){
  event = event.detail;
  document.getElementById("view-"+event.postId).textContent = event.views;
  }
  );

  document.addEventListener('new-comment',  function(event){
  event = event.detail;
  document.getElementById("comment-"+event.postId).textContent = event.comments;
  cargarComentarios(event.postId)
  }
  );



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
        .replace('{{NCOMMENT}}', p.comments)
        .replace('{{colorlike}}', (p.liked==true)?'#000080':'#87CEFA')
        .replace('{{taging}}', getTags(p.tags))
        .replace(/{{liked}}/g, p.liked)
        .replace(/{{POSTID}}/g, p.id)
        //document.getElementById('app').innerHTML = sp 
        document.getElementById("lblPagina").textContent = "Comentarios";
        postxxx = sp
       cargarComentarios(p.id);
       


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

      function cargarComentarios(idPost){
        var sp = '';
        var sp2 = '';
        var sp3 = '';

        //commentarios = '';
        blogapi.getPostCommets(idPost)
        .then(res => {

          res.forEach(p => {
            sp2 = commentsTemplate.replace('{{COMENTARIO}}',p.body)
                                 .replace('{{USER}}',p.userName)
                                 .replace('{{EMAIL}}',p.userEmail)
                                 .replace('{{FECHACOMENTARIO}}', moment(p.createdAt).format('MMMM Do YYYY, h:mm:ss a'));
            sp3 = sp2
            sp2 = sp
            sp = sp3 + sp2

            });

             document.getElementById('app').innerHTML = postxxx + commentsTemplateH + sp + commentsTemplateF
             document.getElementById("btnComentar").addEventListener('click',Comentarevent);
        })
        .catch(err => console.error(err));

      }

      function Comentarevent(event){
        var ueObject = event.target;
        var idPost = ueObject.getAttribute('data-postid');
        comentarPost(idPost);
      }

      function comentarPost(idPost){
        var comentario = document.getElementById("txtComentario").value;
        if(comentario==""){
          alert("Debe escribir un comentario");
          document.getElementById("txtComentario").focus();
          return;
        }

        if(idPost==null){
          alert("id post nulo");
          return;
        }

        var data ={
          body: comentario,
        };

        blogapi.PostComment(idPost,data)
        .then(value => {
            //console.log(value);
            //if(value.status==1)
            document.getElementById("txtComentario").value = "";
            document.getElementById("txtComentario").focus();
        })
        .catch(err => console.error(err));

      }
    




export default verPostComments;