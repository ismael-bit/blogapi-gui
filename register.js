function registrar(){
    var name =document.getElementById("txtname").value;
    var email =document.getElementById("txtemail").value;
    var password =document.getElementById("txtpassword").value;
    var password2 =document.getElementById("txtpassword2").value;

    if(name==""){
      alert("Nombre no puede estar en blanco");
      document.getElementById("txtname").focus();
      return;
    }
    if(email==""){
        alert("Email no puede estar en blanco");
        document.getElementById("txtemail").focus();
        return;
    }
    if( !validar_email( email ) ){
        alert("Debe Escribir un email válido");
        document.getElementById("txtemail").focus();
        return;
      }
    
    if(password==""){
      alert("Contraseña no puede estar en blanco");
      document.getElementById("password").focus();
      return;
    }
    if(password2 != password){
        alert("Contraseñas no son iguales");
        document.getElementById("password").focus();
        return;
    }

    var data ={
        name: name,
        email:email,
        password:password
    };
    
    fetch(`${API_PATH}/register`, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())

      .then(response => {
        if(response.error){
            alert(response.message);
            document.getElementById("txtemail").focus();
        }else{
            alert("usuario: "+response.email+" Creado");
            document.reset;
            window.location.href ="login.html";
          }
        })
      
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}

function validar_email( email ) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

window.onload = function(){
  document.getElementById("btnregistrarse").addEventListener('click',function(){registrar();});
}