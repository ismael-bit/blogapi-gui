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
    console.log(token);
    if (token === null || token === undefined){
        window.location.href = 'login.html';
    }  
    document.getElementById("btnLogout").addEventListener('click',function(){logout();}); 
}
