const moment = require("moment");
var token;

var postTemplate = `
<div class="card" style="margib-top: 10px">
  <div class="card-body">
    <h5 class="card-title"><span class="oi oi-icon-name" title="icon name" aria-hidden="true"></span>{{TITLE}}</h5>
    <h6 class="card-subtitle mb-2 text-muted">by: <a href="#"  data-userid="{{USERID}}" class="btnEmail">{{NAME}} - {{EMAIL}}</a>, <span style='color: grey'> {{DATE}} - </span><span style='color: grey'> <i>{{DATE2}}</i></span></h6>
    <p class="card-text">{{BODY}}</p>

    <button class="btn btn-primary" type="button" style="background-color: blue">
    <i class="fas fa-thumbs-up"></i>
    </button>
    
    <button class="btn btn-primary" type="button" style="background-color: green">
    <i class="fas fa-comments"></i>
    </button>

    <button class="btn btn-primary col-sm-12 col-md-2" type="button" style="background-color: green">
    <i class="fas fa-comments"></i>
    </button>


    

    </div>
</div>
`

{/* <a href="#profile/1" class="paginate_button page-item">Card link</a>
<a href="#" class="paginate_button page-item">Another link</a> */}

function showPost(){
  var data;
  var cabecera = new Headers();
  cabecera.append("Authorization",'Bearer '+ token);                    
  cabecera.append('Content-Type', 'application/json');
  console.log("Token " + token);
  fetch(`${API_PATH}/post`, {
    method: 'GET',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:cabecera
  }).then(res => res.json())
  .then(res => {
      var postView = '';
      console.log(res);
      res.forEach(p => {
          postView = postView + postTemplate.replace('{{BODY}}',p.body)
                                            .replace('{{NAME}}',p.userName)
                                            .replace('{{EMAIL}}',p.userEmail)
                                            .replace('{{TITLE}}',p.title)
                                            .replace('{{USERID}}',p.userId)
                                            .replace('{{DATE}}', moment(p.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
                                            .replace('{{DATE2}}', moment(p.createdAt).fromNow());

                        });
      document.getElementById("app").innerHTML=postView;
      var bes = document.getElementsByClassName("btnEmail");
      for(i=0; i < bes.length;i++)
      {
          bes[i].addEventListener('click',showUserProfile);
      }

   })      
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}


function showUserProfile(){


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

    //console.log(postTemplate);

    document.getElementById("btnLogout").addEventListener('click',function(){logout();}); 
    document.getElementById("btnShowPost").addEventListener('click',function(){showPost();}); 
  }

