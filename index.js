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
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}

window.onload = function(){
    document.getElementById("btnLogin").addEventListener('click',function(){login();});
}
    
/*
window.onload = function(){
//document.getElementById("btnSaludar").addEventListener('click',function(){alert("Hola Persona");)});
document.getElementById("btnSaludar").addEventListener('click',function(){saludar();});
}
*/
