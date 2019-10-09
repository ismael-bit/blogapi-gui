/*
function saludar(){
var nombre =document.getElementById("nombre_persona").value;
//alert("Hola "+ nombre + "!");
document.getElementById("placeholder").textContent = "Hola " + nombre;
}
*/

function login(){
    var username =document.getElementById("username").value;
    var password =document.getElementById("password").value;

    if(username==""){
      alert("Usuario no puede estar en blanco");
      document.getElementById("username").focus();
      return;
    }
    if(password==""){
      alert("Contraseña no puede estar en blanco");
      document.getElementById("password").focus();
      return;
    }

    var data ={
        username: username,
        password:password,
        email:username
    };
    console.log(data);
    
    fetch(`${API_PATH}/login`, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {
        if(response.estatus && response.estatus == "error"){
            alert("Usuario o Contraseña incorrectos.");
            document.getElementById("password").focus();
        }else{
            var UserData = {
                "id":response.id,
                "name":response.name,
                "email":response.email,
                "token":response.token
            };
            alert("Usuario " + UserData.name + " logeado correctamente");
            localStorage.setItem('token', response.token);
            window.location.href ="index.html";
            /*
            localStorageSaver(JSON.stringify(UserData));
            session("Iniciando session como: "+UserData.name);
            setTimeout(function(){
                $("#form-login")[0].reset();
                window.location.href = "index.html";
            },1500);
            */
        }
       })      
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}

function isLoged(){
  var token = localStorage.getItem('token');

  if (token === null || token === undefined){
      return false;
  }

  return true;
}

window.onload = function(){
  if (isLoged()) {
    window.location.href = 'index.html';
  };


  document.getElementById("btnLogin").addEventListener('click',function(){login();});
}
    
/*
window.onload = function(){
//document.getElementById("btnSaludar").addEventListener('click',function(){alert("Hola Persona");)});
document.getElementById("btnSaludar").addEventListener('click',function(){saludar();});
}
*/
