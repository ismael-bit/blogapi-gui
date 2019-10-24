import Route from '../libs/route';
import moment from 'moment'

var profileTemplate = `
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
            <h6><a href="#" id="btnLogout">Deslogearse </a></h6>
        </div>
</div>
</div>
`

class Profile extends Route {

    constructor(){
        super('profile', { content: '<h5>Loading page</h5>' })
        this.onMountCb = this.whenMounted
    }

   async logout(){

        var logout = await blogapi.logout();

        if (logout !== undefined){
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        }
    }

    whenMounted(cb){

        // setTimeout(() => {
        var t = '';
        t = profileTemplate.replace('{{DATECREATE}}',moment(me.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
                                      .replace('{{EMAIL}}',me.email)
                                      .replace('{{ID}}',me.id)
                                      .replace('{{NAME}}',me.name)
                                      .replace('{{CPOSTS}}',me.posts)
                                       ;
        // set the html page
        cb(t);

        document.getElementById("lblPagina").textContent = "Perfil de Usuario";        

        document.getElementById('btnLogout')
        .addEventListener('click', () => this.logout());
        // }, 3000);
    }
}

var profile = new Profile();
export default profile;