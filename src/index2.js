window.onload = function(){

    var token = localStorage.getItem('token');
    console.log(token);
    if (token === null || token === undefined){
        window.location.href = 'login.html';
    }  
  }
  
