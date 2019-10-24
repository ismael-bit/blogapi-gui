import Route from '../libs/route';
import moment from 'moment'


var postTemplate = `
<div class="card" style="margin-top: 10px">
  <div class="card-body">
    <h5 class="card-title"><span class="oi oi-icon-name" title="icon name" aria-hidden="true"></span>{{TITLE}}</h5>
    <p class="card-text">{{BODY}}</p>
    <h6 class="card-subtitle mb-2 text-muted">by: <a href="#profile" data-userid="{{USERID}}" class="btnEmail">{{NAME}} - {{EMAIL}}</a>, <span style='color: grey'> {{DATE}} - </span><span style='color: grey'> <i>{{DATE2}}</i></span></h6>
    </br>
    
    <button class="btnLike btn btn-primary fas fa-thumbs-up" type="button" style="background-color: {{colorlike}}" data-liked="{{liked}}" data-postid="{{POSTID}}">
    </button>
    
    <button class="btn btn-primary fas fa-comments" type="button" style="background-color: green">
    </button>

    </br>
    <i class="fas fa-eye"></i><label>&nbsp {{NLIKE}} Likes &nbsp</label>
    <i class="fas fa-thumbs-up"></i><label>&nbsp {{NVIEW}} Comentarios</label>
    <small class="text-tags text-truncate float-right"><em>{{taging}}</em></small>

    </div>
</div>
</br>
`

class Post extends Route {

    constructor(){
        super('post', { htmlName : '/views/post.html', default : true });
        this.onMountCb = this.whenMounted
    }

    clickBtn3(){
        console.log("Trying btn1 on post route")
    }

   async whenMounted(){
        //document.getElementById('btn1').addEventListener('click', () =>  this.clickBtn3());
        document.getElementById('posts').innerHTML = '<h3>Loading Posts</h3>'

        var posts = await blogapi.getPosts();
        var sp = '';

        posts.forEach(p => {
            
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
            .replace('{{liked}}', p.liked)
            .replace('{{POSTID}}', p.id)
        });

        document.getElementById('posts').innerHTML = sp

      function getTags(data){
        var html=``;
        $(data).each(function(index,value){
            html+=`<a href="javascript:void(0)" class="btn btn-link mx-0 px-0">${$.trim(value)}</a>, `;
         // html+=`<a href="javascript:void(0)" class="btn btn-link mx-0 px-0" onclick="filtrarpost('${String($.trim(value))}')">${$.trim(value)}</a>, `;
          })
        html = html.slice(0,-2);
        return html;
      } 
        var bes = document.getElementsByClassName("btnLike");
        var i = 0; 
        for(i=0; i < bes.length;i++)
        {
          bes[i].addEventListener('click',showLikeEventProfile);
        }

        function showLikeEventProfile(event){
          var ueObject = event.target;
          var idPost = ueObject.getAttribute('data-postid');
          var liked = ueObject.getAttribute('data-liked');

          alert("idPost=" + idPost)
          alert("liked=" + liked)

          if(idPost == null || idPost == undefined){
            return;
          }
          if(liked == null || liked == undefined){
            return;
          }
          if(liked=='true')
          {
            console.log("Dislike")
            QuitarLike(idPost);
          }
          else
          {
            console.log("Like")
            DarLike(idPost);
          }
        } 

      function DarLike(postId){
        blogapi.likePost(postId)
        .then(value => {
            console.log(value.status);
        })
        .catch(err => console.error(err));
      }

      function QuitarLike(postId){
        blogapi.unlikePost(postId)
        .then(value => {
            console.log(value.status);
        })
        .catch(err => console.error(err));
      }

        var bes = document.getElementsByClassName("btnEmail");
        for(i=0; i < bes.length;i++)
        {
            bes[i].addEventListener('click',showUserEventProfile);
        }

        document.getElementById("lblPagina").textContent = "Posts";
        var bes = document.getElementsByClassName("btnLike");
        for(i=0; i < bes.length;i++)
        {
            bes[i].addEventListener('click',showLikeEventProfile);
        }        


    function showUserEventProfile(event){
        var ueObject = event.target;
        var idUser = ueObject.getAttribute('data-userid');
        showUserProfile(idUser);
      }

      function showUserProfile(idUser){
        var userSelected = blogapi.getUser(idUser);
      }        
    
  }

}

var post = new Post();
export default post;