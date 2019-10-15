
// var postTemplate = this.httpClient.get(`${this.basePath}/views/post.html`);

var postTemplate = `<div>
<h3>{{TITLE}}</h3>
<h5>By: {{NAME}} - <span style="color: gray;"><a href="#"  data-userid="{{USERID}}" class="btnEmail">{{EMAIL}}</a></span></h5>
<p>{{BODY}}</p>
<hr>
</div>
`;

function showPost(){
  fetch(`${API_PATH}/post`, {
    method: 'GET',
    //body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(res => {
      var postView = '';
      console.log(res);
      res.forEach(p => {
          postView = postView + postTemplate.replace('{{BODY}}',p.body)
                                            .replace('{{NAME}}',p.userName)
                                            .replace('{{EMAIL}}',p.userEmail)
                                            .replace('{{TITLE}}',p.title)
                                            .replace('{{USERID}}',p.userId);

                                          });
      document.getElementById("app").innerHTML=postView;
      //var bes = document.getElementsByClassName("btnEmail");
      // for(i=0; i < bes.length;i++)
      // {
      //     bes[i].addEventListener('click',showUserProfile);
      // }

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

    var token = localStorage.getItem('token');
    //console.log(token);
    if (token === null || token === undefined){
        window.location.href = 'login.html';
    }  

    //console.log(postTemplate);

    document.getElementById("btnLogout").addEventListener('click',function(){logout();}); 
    document.getElementById("btnShowPost").addEventListener('click',function(){showPost();}); 
  }

