const moment = require("moment");
var token;
var meUser = null;

var postTemplate = `
<div class="card" style="margin-top: 10px">
  <div class="card-body">
    <h5 class="card-title"><span class="oi oi-icon-name" title="icon name" aria-hidden="true"></span>{{TITLE}}</h5>
    <p class="card-text">{{BODY}}</p>
    <h6 class="card-subtitle mb-2 text-muted">by: <a href="#"  data-liked="{{liked}}" data-postid="{{POSTID}}" data-userid="{{USERID}}" class="btnEmail">{{NAME}} - {{EMAIL}}</a>, <span style='color: grey'> {{DATE}} - </span><span style='color: grey'> <i>{{DATE2}}</i></span></h6>
    
    </br>
    <button class="btn btn-primary btnLike" type="button" style="background-color: {{colorlike}}">
    <i class="fas fa-thumbs-up"></i>
    </button>
    
    <button class="btn btn-primary" type="button" style="background-color: green">
    <i class="fas fa-comments"></i>
    </button>
    </br>
    <i class="fas fa-eye"></i><label>&nbsp {{NLIKE}} Likes &nbsp</label>
    <i class="fas fa-thumbs-up"></i><label>&nbsp {{NVIEW}} Comentarios</label>
    <small class="text-tags text-truncate float-right"><em>{{taging}}</em></small>

    </div>
</div>
</br>
`

var profileUSerTemplate = `
<div class="container-fluid well span6">
	<div class="row-fluid">
        <div class="span2" >
		    <img src="Template/nouser.jpg" class="img-circle">
        </div>
        <hr>
        <div class="span8">
            <h3>{{NAME}}</h3>
            <h6>Email: <i>{{EMAIL}}</i></h6>
            <h6>Posts: <i>{{CPOSTS}}</i></h6>
            <h6>Creado en: <i>{{DATECREATE}}</i></h6>
            <h6><a href="#" id="btnVerPosts">Ver Posts... </a></h6>
        </div>
</div>
</div>
`

function showPost(){
  var data;
  var cabecera = new Headers();
  cabecera.append("Authorization",'Bearer '+ token);                    
  cabecera.append('Content-Type', 'application/json');
  fetch(`${API_PATH}/post`, {
    method: 'GET',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:cabecera
  }).then(res => res.json())
  .then(res => {
      var postView = '';
      res.forEach(p => {
          postView = postView + postTemplate.replace('{{BODY}}',p.body)
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
                                            .replace('{{liked}}', p.liked)
                                            .replace('{{POSTID}}', p.id)
                                            ;

                        });
      document.getElementById("app").innerHTML=postView;
      document.getElementById("app2").innerHTML="";

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



   })      
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}

function showLikeEventProfile(event){
  var ueObject = event.target;
  var idPost = ueObject.getAttribute('data-postid');
  var liked = ueObject.getAttribute('data-liked');
  console.log("id post:"+idPost);
  console.log("liked:"+liked);

  if(liked===true){
    QuitarLike(idPost);
  }else{
    DarLike(idPost);
  }
}

function showUserEventProfile(event){
  var ueObject = event.target;
  var idUser = ueObject.getAttribute('data-userid');
  showUserProfile(idUser);
}

function showMyPost(userId,opciontPost2){
  var data;
  var cabecera = new Headers();
  cabecera.append("Authorization",'Bearer '+ token);                    
  cabecera.append('Content-Type', 'application/json');
  fetch(`${API_PATH}/post?userId=${userId}`, {
    method: 'GET',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:cabecera
  }).then(res => res.json())
  .then(res => {
      var postView = '';
      res.forEach(p => {
          postView = postView + postTemplate.replace('{{BODY}}',p.body)
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
                                            ;

                        });
      if(opciontPost2===0){
        document.getElementById("app").innerHTML=postView;
        document.getElementById("app2").innerHTML="";
      }
      else{
        document.getElementById("app2").innerHTML=postView;
      }

      var bes = document.getElementsByClassName("btnEmail");
      for(i=0; i < bes.length;i++)
      {
          bes[i].addEventListener('click',showUserEventProfile);
      }
      document.getElementById("lblPagina").textContent = "Mis Posts";

   })      
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}

function getTags(data){
  var html=``;
  $(data).each(function(index,value){
      html+=`<a href="javascript:void(0)" class="btn btn-link mx-0 px-0">${$.trim(value)}</a>, `;
// html+=`<a href="javascript:void(0)" class="btn btn-link mx-0 px-0" onclick="filtrarpost('${String($.trim(value))}')">${$.trim(value)}</a>, `;

    })
  html = html.slice(0,-2);
  return html;
}


function showUserProfile(idUser){
  var data;
  var cabecera = new Headers();
  cabecera.append("Authorization",'Bearer '+ token);                    
  cabecera.append('Content-Type', 'application/json');
  fetch(`${API_PATH}/users/${idUser}`, {
    method: 'GET',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:cabecera
  }).then(res => res.json())
  .then(res => {
      var postView = '';
      postView = profileUSerTemplate.replace('{{DATECREATE}}',moment(res.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
                                    .replace('{{EMAIL}}',res.email)
                                    .replace('{{ID}}',res.id)
                                    .replace('{{NAME}}',res.name)
                                    .replace('{{CPOSTS}}',res.posts)
                                     ;
      document.getElementById("app").innerHTML=postView;
      document.getElementById("app2").innerHTML="";
      document.getElementById("btnVerPosts").addEventListener('click',function(){showMyPost(res.id,1);}); 
      document.getElementById("lblPagina").textContent = "Perfil de Usuario";

   })      
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}


function QuitarLike(postId) {

  var data;
  fetch(`${API_PATH}/post/${postId}/like`, {
      method: 'DELETE',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    showPost();
}

function DarLike(postId) {

  var data;
  fetch(`${API_PATH}/post/${postId}/like`, {
      method: 'PUT',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    showPost();
}


function LoadMeUser(){
    token = localStorage.getItem('token');

    var data;
    var cabecera = new Headers();
    cabecera.append("Authorization",'Bearer '+ token);                    
    cabecera.append('Content-Type', 'application/json');
    fetch(`${API_PATH}/users/me`, {
      method: 'GET',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:cabecera
    }).then(res => res.json())
    .then(res => {
      meUser = res;
      console.log(meUser.name);
      // document.getElementById("txtUserMe").textContent = meUser.name;
     })      
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  function logout() {

    var data;
    fetch(`${API_PATH}/logout`, {
        method: 'DELETE',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    // this.httpClient.delete(`${API_PATH}/logout`);
    console.log('1:'+ localStorage.getItem('token'));
    localStorage.removeItem('token');
    console.log('2:'+ localStorage.getItem('token'));



    window.location.href = '/login.html';
  }

  window.onload = function(){

    //console.log(token);
    token = localStorage.getItem('token');

    if (token === null || token === undefined){
        window.location.href = 'login.html';
    }  

    LoadMeUser();
    
    showPost();

    document.getElementById("btnLogout").addEventListener('click',function(){logout();}); 
    document.getElementById("btnShowPost").addEventListener('click',function(){showPost();}); 
    document.getElementById("btnShowMyPost").addEventListener('click',function(){showMyPost(meUser.id,0);}); 
    document.getElementById("btnShowMyProfile").addEventListener('click',function(){showUserProfile(meUser.id);}); 
    
  }

